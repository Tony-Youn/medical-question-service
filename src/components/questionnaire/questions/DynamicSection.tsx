"use client";

import React, { useState, useEffect } from "react";
import { fetchQuestionsBySection } from "@/lib/services/questionnaire";
import { QuestionnaireQuestion, QuestionnaireSection } from "@/lib/types";
import DynamicQuestion from "./DynamicQuestion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface DynamicSectionProps {
  section: QuestionnaireSection;
  responses: Record<string, any>;
  onResponseChange: (questionId: string, value: any) => void;
}

const DynamicSection: React.FC<DynamicSectionProps> = ({
  section,
  responses,
  onResponseChange,
}) => {
  const [questions, setQuestions] = useState<QuestionnaireQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Organize questions into parent and child relationships
  const [parentQuestions, setParentQuestions] = useState<
    QuestionnaireQuestion[]
  >([]);
  const [childQuestionMap, setChildQuestionMap] = useState<
    Record<string, QuestionnaireQuestion[]>
  >({});

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        const fetchedQuestions = await fetchQuestionsBySection(section.id);
        setQuestions(fetchedQuestions);

        // Organize into parent/child structure
        const parents: QuestionnaireQuestion[] = [];
        const childrenMap: Record<string, QuestionnaireQuestion[]> = {};

        fetchedQuestions.forEach((question) => {
          if (!question.parent_question_id) {
            // This is a parent/root question
            parents.push(question);
          } else {
            // This is a child question
            if (!childrenMap[question.parent_question_id]) {
              childrenMap[question.parent_question_id] = [];
            }
            childrenMap[question.parent_question_id].push(question);
          }
        });

        setParentQuestions(parents);
        setChildQuestionMap(childrenMap);
        setError(null);
      } catch (err) {
        console.error("Error loading questions:", err);
        setError("질문을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, [section.id]);

  // Handle response changes
  const handleResponseChange = (questionId: string, value: any) => {
    console.log(`Response changed for question ${questionId}:`, value);
    onResponseChange(questionId, value);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 animate-pulse">
            <div className="flex items-start gap-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div className="pl-9 space-y-3">
              <Skeleton className="h-10 w-full rounded-md" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="text-red-500 rounded-full bg-red-100 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14M8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4m0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-red-700 font-medium mb-2">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-1 bg-white border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => window.location.reload()}
              >
                다시 시도
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (parentQuestions.length === 0) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="py-6">
          <div className="flex items-center justify-center text-center py-8">
            <div className="max-w-md">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 inline-block mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11" />
                  <path d="M8 5.75a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75M7.99 11a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5" />
                </svg>
              </div>
              <h3 className="text-blue-700 font-medium mb-2">
                질문이 없습니다
              </h3>
              <p className="text-blue-600 text-sm">
                이 섹션에는 질문이 없습니다. 관리자에게 문의하시거나 다음
                섹션으로 이동해주세요.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {parentQuestions.map((question) => (
        <DynamicQuestion
          key={question.id}
          question={question}
          value={responses[question.id]}
          onChange={handleResponseChange}
          dependentQuestions={childQuestionMap[question.id] || []}
        />
      ))}
    </div>
  );
};

export default DynamicSection;
