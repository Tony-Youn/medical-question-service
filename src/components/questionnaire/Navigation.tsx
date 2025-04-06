"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { QuestionnaireStep } from "@/lib/enums/questionnaire";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting?: boolean;
  isNextDisabled?: boolean;
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isSubmitting = false,
  isNextDisabled = false,
  className,
}) => {
  const isFirstStep = currentStep === QuestionnaireStep.INTRODUCTION;
  const isLastStep = currentStep === QuestionnaireStep.COMPLETION;

  return (
    <div className={cn("flex justify-between mt-6", className)}>
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep || isSubmitting}
        className={cn(isFirstStep ? "invisible" : "visible")}
      >
        이전
      </Button>

      <Button
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        className="ml-auto"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {isLastStep ? "제출 중..." : "다음 중..."}
          </span>
        ) : isLastStep ? (
          "제출하기"
        ) : (
          "다음"
        )}
      </Button>
    </div>
  );
};

export default Navigation;
