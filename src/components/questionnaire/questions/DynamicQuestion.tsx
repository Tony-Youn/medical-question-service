"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { QuestionnaireQuestion } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface DynamicQuestionProps {
  question: QuestionnaireQuestion;
  value: any;
  onChange: (questionId: string, value: any) => void;
  dependentQuestions?: QuestionnaireQuestion[];
}

const DynamicQuestion: React.FC<DynamicQuestionProps> = ({
  question,
  value,
  onChange,
  dependentQuestions = [],
}) => {
  const [showDependentQuestions, setShowDependentQuestions] = useState(false);
  const [relevantDependentQuestions, setRelevantDependentQuestions] = useState<
    QuestionnaireQuestion[]
  >([]);
  const [dependentValues, setDependentValues] = useState<Record<string, any>>(
    {}
  );
  const previousDependentValuesRef = useRef<Record<string, any>>({});

  // Parse options from the question
  const options = question.options
    ? Array.isArray(question.options)
      ? question.options
      : typeof question.options === "string"
      ? JSON.parse(question.options)
      : []
    : [];

  // Memoized function to filter dependent questions
  const getRelevantDependentQuestions = useCallback(() => {
    if (!value || dependentQuestions.length === 0) {
      return [];
    }

    // Find dependent questions that match the current value
    return dependentQuestions.filter((q) => {
      try {
        // If parent_response_value is a string, compare directly
        if (typeof q.parent_response_value === "string") {
          return q.parent_response_value === value.toString();
        }

        // If it's an array (parsed JSON), check if the value is included
        if (q.parent_response_value) {
          let valueArray;
          try {
            valueArray = JSON.parse(String(q.parent_response_value));
            if (Array.isArray(valueArray)) {
              return valueArray.includes(value.toString());
            }
          } catch (e) {
            // If parsing fails, just compare as strings
            return String(q.parent_response_value) === value.toString();
          }
        }

        // Default fallback - show if there's a parent relationship regardless of value
        return true;
      } catch (error) {
        console.error("Error processing dependent question:", error);
        return false;
      }
    });
  }, [value, dependentQuestions]);

  // Update dependent questions when value changes
  useEffect(() => {
    try {
      if (!value || dependentQuestions.length === 0) {
        setShowDependentQuestions(false);
        setRelevantDependentQuestions([]);
        return;
      }

      // Directly filter dependent questions within the useEffect
      const relevant = dependentQuestions.filter((q) => {
        try {
          // If parent_response_value is a string, compare directly
          if (typeof q.parent_response_value === "string") {
            return q.parent_response_value === value.toString();
          }

          // If it's an array (parsed JSON), check if the value is included
          if (q.parent_response_value) {
            let valueArray;
            try {
              valueArray = JSON.parse(String(q.parent_response_value));
              if (Array.isArray(valueArray)) {
                return valueArray.includes(value.toString());
              }
            } catch (e) {
              // If parsing fails, just compare as strings
              return String(q.parent_response_value) === value.toString();
            }
          }

          // Default fallback - show if there's a parent relationship regardless of value
          return true;
        } catch (error) {
          console.error("Error processing dependent question:", error);
          return false;
        }
      });

      setRelevantDependentQuestions(relevant);
      setShowDependentQuestions(relevant.length > 0);

      // When value changes, reset the dependent values for questions that are no longer relevant
      setDependentValues((prev) => {
        const newValues = { ...prev };
        const currentIds = new Set(relevant.map((q) => q.id));
        Object.keys(newValues).forEach((id) => {
          if (!currentIds.has(id)) {
            delete newValues[id];
          }
        });
        return newValues;
      });
    } catch (error) {
      console.error("Error in dependent questions useEffect:", error);
    }
  }, [value, dependentQuestions]);

  // Handle dependent question changes
  const handleDependentChange = (questionId: string, newValue: any) => {
    setDependentValues((prev) => ({
      ...prev,
      [questionId]: newValue,
    }));
    // We shouldn't directly call the parent onChange here to avoid the circular updates
    // Instead, we should only update our local state
  };

  // Propagate dependent values to parent, but only when dependentValues actually changes
  useEffect(() => {
    // Skip the first render and avoid unnecessary onChange calls
    if (Object.keys(dependentValues).length > 0) {
      // Send each dependent value to the parent, but only if it changed
      Object.entries(dependentValues).forEach(([questionId, questionValue]) => {
        const prevValue = previousDependentValuesRef.current[questionId];

        // Only call onChange if the value has actually changed
        if (
          questionValue !== undefined &&
          JSON.stringify(prevValue) !== JSON.stringify(questionValue)
        ) {
          onChange(questionId, questionValue);
        }
      });
    }

    // Update the ref for the next render
    previousDependentValuesRef.current = { ...dependentValues };
  }, [dependentValues]);

  // Handle change events
  const handleChange = (newValue: any) => {
    // Log for debugging
    console.log(
      `Question change: ID ${question.id}, Type: ${question.question_type}, New value:`,
      newValue
    );

    // Avoid calling onChange if the value hasn't changed
    if (JSON.stringify(value) !== JSON.stringify(newValue)) {
      onChange(question.id, newValue);
    }
  };

  // Render the appropriate input based on question type
  const renderQuestionInput = () => {
    switch (question.question_type) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor={`question-${question.id}`}>답변</Label>
            <Input
              type="text"
              id={`question-${question.id}`}
              value={value || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full"
              required={question.is_required}
              placeholder="답변을 입력하세요"
            />
          </div>
        );

      case "number":
        return (
          <div className="space-y-2">
            <Label htmlFor={`question-${question.id}`}>답변</Label>
            <Input
              type="number"
              id={`question-${question.id}`}
              value={value || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full"
              required={question.is_required}
              placeholder="숫자를 입력하세요"
            />
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={`question-${question.id}`}>답변</Label>
            <Textarea
              id={`question-${question.id}`}
              value={value || ""}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full min-h-[100px]"
              required={question.is_required}
              placeholder="자세한 답변을 입력하세요"
            />
          </div>
        );

      case "select":
        // Replace Select with a button option group for better UX
        return (
          <div className="space-y-3">
            <RadioGroup
              name={`question-${question.id}`}
              options={options}
              value={value || ""}
              onChange={handleChange}
              variant="cards"
              orientation={options.length > 2 ? "vertical" : "horizontal"}
            />
          </div>
        );

      case "radio":
        // Enhance radio options with a more touch-friendly design
        return (
          <div className="space-y-3">
            <RadioGroup
              name={`question-${question.id}`}
              options={options}
              value={value || ""}
              onChange={handleChange}
              variant="cards"
              orientation={options.length > 2 ? "vertical" : "horizontal"}
            />
          </div>
        );

      case "multiselect":
        // For multiselect, use the CheckboxGroup component
        const multiSelectValues = value
          ? Array.isArray(value)
            ? value
            : [value]
          : [];

        return (
          <div className="space-y-3">
            <CheckboxGroup
              name={`question-${question.id}`}
              options={options}
              values={multiSelectValues}
              onChange={handleChange}
              className="pt-2"
            />
          </div>
        );

      case "checkbox":
        // For checkbox, we keep the button-styled implementation
        const selectedValues = value
          ? Array.isArray(value)
            ? value
            : [value]
          : [];

        return (
          <div className="space-y-3">
            <fieldset className="space-y-2">
              <legend className="sr-only">옵션 선택</legend>
              {options.map((option: any, index: number) => {
                const isChecked = selectedValues.includes(
                  option.value.toString()
                );
                return (
                  <Button
                    key={`${option.value}-${index}`}
                    type="button"
                    variant="outline"
                    className={cn(
                      "justify-start text-left w-full h-auto py-3 px-4",
                      isChecked
                        ? "border-2 border-primary bg-primary/10"
                        : "hover:bg-muted/50"
                    )}
                    onClick={() => {
                      if (isChecked) {
                        handleChange(
                          selectedValues.filter(
                            (v: string) => v !== option.value.toString()
                          )
                        );
                      } else {
                        handleChange([
                          ...selectedValues,
                          option.value.toString(),
                        ]);
                      }
                    }}
                  >
                    <div className="flex items-center w-full">
                      <div className="w-4 h-4 mr-2 border border-current flex items-center justify-center">
                        {isChecked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  </Button>
                );
              })}
            </fieldset>
          </div>
        );

      default:
        return (
          <div className="text-red-500">
            Unsupported question type: {question.question_type}
          </div>
        );
    }
  };

  return (
    <Card
      className={cn(
        "transition-all",
        question.parent_question_id ? "border-l-4 border-l-primary/20" : ""
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-start">
          {question.question_text}
          {question.is_required && <span className="text-red-500 ml-1">*</span>}
        </CardTitle>
        {question.description && typeof question.description === "string" && (
          <CardDescription>{question.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">{renderQuestionInput()}</div>

        {/* Render dependent questions if needed */}
        {showDependentQuestions && relevantDependentQuestions.length > 0 && (
          <div className="mt-4 ml-3 pl-3 border-l-2 border-l-primary/20 space-y-4">
            {relevantDependentQuestions.map((dependentQuestion) => (
              <DynamicQuestion
                key={dependentQuestion.id}
                question={dependentQuestion}
                value={dependentValues[dependentQuestion.id]}
                onChange={handleDependentChange}
                dependentQuestions={[]} // Pass empty array to avoid recursive dependencies
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DynamicQuestion;
