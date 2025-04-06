"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchSections,
  submitQuestionnaireResponses,
} from "@/lib/services/questionnaire";
import { QuestionnaireSection } from "@/lib/types";
import DynamicSection from "./questions/DynamicSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import FormCard from "./FormCard";
import ProgressBar from "./ProgressBar";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

interface QuestionnaireFormProps {
  profileId?: string;
  submissionId?: string;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({
  profileId,
  submissionId,
}) => {
  const router = useRouter();
  const { data } = useQuestionnaireStore();
  const [sections, setSections] = useState<QuestionnaireSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  // Initialize with data from store if available
  useEffect(() => {
    if (data.basicInfo.name) {
      setName(data.basicInfo.name);
    }
  }, [data.basicInfo.name]);

  // Update store when name changes
  useEffect(() => {
    if (name && name.trim() !== "") {
      useQuestionnaireStore
        .getState()
        .updateResponse("basicInfo", "name", name);
    }
  }, [name]);

  // Load sections
  useEffect(() => {
    async function loadSections() {
      try {
        setLoading(true);
        const fetchedSections = await fetchSections();

        // Sort sections by order_index
        const sortedSections = fetchedSections.sort(
          (a, b) => (a.order_index || 0) - (b.order_index || 0)
        );

        setSections(sortedSections);
        setError(null);
      } catch (err) {
        console.error("Error loading sections:", err);
        setError("설문지를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    loadSections();
  }, []);

  // Handle response changes
  const handleResponseChange = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle next section
  const handleNextSection = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle previous section
  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle final submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked");

    try {
      setSubmitting(true);

      // Get the current form data directly from the store
      const currentData = useQuestionnaireStore.getState().data.basicInfo;
      console.log("Current form data:", currentData);

      // Check if form fields are filled
      if (!name || name.trim() === "") {
        toast.error("이름을 입력해주세요.");
        setSubmitting(false);
        return;
      }

      // Get age directly from the store
      const age = currentData.age;
      if (age === null || age === undefined) {
        toast.error("나이를 입력해주세요.");
        setSubmitting(false);
        return;
      }

      // Get gender directly from the store
      const gender = currentData.gender;
      if (!gender) {
        toast.error("성별을 선택해주세요.");
        setSubmitting(false);
        return;
      }

      // Format responses for submission
      const formattedResponses = Object.entries(responses).map(
        ([questionId, value]) => ({
          question_id: questionId,
          response_value:
            typeof value === "object" ? JSON.stringify(value) : String(value),
          response_text: typeof value === "object" ? null : String(value),
        })
      );
      console.log("Formatted responses:", formattedResponses);

      // Instead of adding non-UUID fields, just log the basic info
      console.log("Basic info to be submitted:", {
        name,
        age,
        gender,
      });

      // Submit to database
      console.log("Submitting to API with data:", {
        name,
        email,
        age,
        gender,
        responses: formattedResponses,
      });

      // Pass the data for submission
      const result = await submitQuestionnaireResponses({
        profileId,
        submissionId,
        name,
        email,
        responses: formattedResponses,
      });
      console.log("API response:", result);

      if (result.success) {
        toast.success("설문지가 성공적으로 제출되었습니다!");

        // Redirect to thank you page
        router.push("/questionnaire/submit");
      } else {
        console.error("Submission error details:", result.error);
        toast.error(
          result.error
            ? result.error.message
            : "설문지 제출 중 오류가 발생했습니다."
        );
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("제출 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 px-4">
        <Skeleton className="h-10 w-full max-w-md mx-auto mb-8" />
        <Skeleton className="h-3 w-full mb-2" />
        <Skeleton className="h-3 w-5/6 mb-6" />
        <Skeleton className="h-52 w-full rounded-lg" />
        <div className="flex justify-end space-x-4 mt-6">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <FormCard
          title="오류가 발생했습니다"
          description="설문을 불러오는 중 문제가 발생했습니다"
          status="error"
        >
          <div className="py-4">
            <p className="text-red-600 mb-4">{error}</p>
            <Button className="mt-2" onClick={() => window.location.reload()}>
              다시 시도
            </Button>
          </div>
        </FormCard>
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4">
        <FormCard
          title="설문이 없습니다"
          description="현재 사용 가능한 설문이 없습니다"
          status="info"
        >
          <div className="py-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
            >
              <path d="M9 3v1m0 0h6m-6 0L8 19h8l-1-16m-6 0H5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-3" />
              <path d="M9 7h6m-6 4h6m-6 4h6" />
            </svg>
            <p className="text-gray-500">
              현재 사용 가능한 설문이 없습니다. 나중에 다시 시도해주세요.
            </p>
          </div>
        </FormCard>
      </div>
    );
  }

  const currentSection = sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;

  // Get section names for progress bar
  const sectionNames = sections.map((section) => section.title);

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <ProgressBar
          currentStep={currentSectionIndex}
          totalSteps={sections.length}
          stepNames={sectionNames}
        />
      </div>

      <FormCard
        title={currentSection.title}
        description={currentSection.description || undefined}
        isActive={true}
        footer={
          <div className="flex justify-between w-full items-center">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousSection}
              disabled={isFirstSection}
              className="min-w-28 gap-2 transition-all duration-300 ease-in-out"
            >
              {!isFirstSection && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0"
                      clipRule="evenodd"
                    />
                  </svg>
                  이전
                </>
              )}
            </Button>

            {!isLastSection ? (
              <div className="text-sm bg-gray-50 py-1.5 px-4 rounded-full font-medium text-gray-600 shadow-sm">
                <span className="hidden xs:inline">섹션 </span>
                {currentSectionIndex + 1} / {sections.length}
              </div>
            ) : null}

            {!isLastSection ? (
              <Button
                type="button"
                onClick={handleNextSection}
                className="min-w-28 gap-2 transition-all duration-300 ease-in-out"
              >
                다음
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitting}
                className="min-w-28 bg-green-600 hover:bg-green-700 gap-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg text-white font-medium px-6 py-2"
                onClick={(e) => {
                  // Pre-validate before form submission happens
                  // This helps catch validation issues before the formal handleSubmit
                  const currentData =
                    useQuestionnaireStore.getState().data.basicInfo;
                  console.log(
                    "Pre-validation - Current form data:",
                    currentData
                  );

                  // Don't prevent default here, let the form submission continue if valid
                  if (!name || name.trim() === "") {
                    e.preventDefault(); // Prevent form submission
                    toast.error("이름을 입력해주세요.");
                    return;
                  }

                  if (
                    currentData.age === null ||
                    currentData.age === undefined
                  ) {
                    e.preventDefault(); // Prevent form submission
                    toast.error("나이를 입력해주세요.");
                    return;
                  }

                  if (!currentData.gender) {
                    e.preventDefault(); // Prevent form submission
                    toast.error("성별을 선택해주세요.");
                    return;
                  }

                  console.log(
                    "Pre-validation passed, proceeding with form submission"
                  );
                }}
              >
                {submitting ? (
                  <>
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
                    제출 중...
                  </>
                ) : (
                  <>
                    제출하기
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </Button>
            )}
          </div>
        }
      >
        <DynamicSection
          section={currentSection}
          responses={responses}
          onResponseChange={handleResponseChange}
        />

        {isLastSection && (
          <div className="mt-10 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-medium mb-4">필수 정보 확인</h3>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  이름 (필수)
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    // Update store directly
                    useQuestionnaireStore
                      .getState()
                      .updateResponse("basicInfo", "name", e.target.value);
                  }}
                  placeholder="이름을 입력하세요"
                  className="w-full"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="age" className="block text-sm font-medium">
                  나이 (필수)
                </label>
                <Input
                  id="age"
                  type="number"
                  value={data.basicInfo.age || ""}
                  onChange={(e) => {
                    const age = e.target.value
                      ? parseInt(e.target.value, 10)
                      : null;
                    // Update store directly
                    useQuestionnaireStore
                      .getState()
                      .updateResponse("basicInfo", "age", age);
                  }}
                  placeholder="나이를 입력하세요"
                  className="w-full"
                  required
                  min={1}
                  max={120}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="gender" className="block text-sm font-medium">
                  성별 (필수)
                </label>
                <select
                  id="gender"
                  value={data.basicInfo.gender || ""}
                  onChange={(e) => {
                    // Update store directly
                    useQuestionnaireStore
                      .getState()
                      .updateResponse("basicInfo", "gender", e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">성별을 선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  이메일 (선택사항)
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
                  className="w-full"
                />
              </div>
            </div>
            <div className="py-3 px-4 bg-blue-50 rounded-lg text-sm text-blue-600 flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 flex-shrink-0 mt-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"
                  clipRule="evenodd"
                />
                <path d="M5.125 7.5A2.875 2.875 0 0 1 8 4.625a2.875 2.875 0 0 1 2.875 2.875c0 .581-.172 1.123-.47 1.575l1.102 1.54a.5.5 0 0 1-.106.68l-.937.673a.5.5 0 0 1-.68-.106l-1.14-1.597A2.876 2.876 0 0 1 5.125 7.5" />
              </svg>

              <p>
                제출하신 정보는 의료 서비스 제공 목적으로만 사용되며, 귀하의
                동의 없이 제3자에게 공유되지 않습니다.
              </p>
            </div>

            {isLastSection && (
              <div className="mt-4 py-3 px-4 bg-gray-50 rounded-lg text-xs text-gray-700">
                <p>
                  <strong>현재 입력 정보:</strong> 이름: {name || "입력 필요"},
                  나이: {data.basicInfo.age || "입력 필요"}, 성별:{" "}
                  {data.basicInfo.gender || "입력 필요"}
                </p>
                <p className="mt-1">모든 필수 정보를 입력해주세요.</p>
              </div>
            )}
          </div>
        )}
      </FormCard>
    </form>
  );
};

export default QuestionnaireForm;
