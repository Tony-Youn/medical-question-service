import React from "react";
import QuestionnaireForm from "@/components/questionnaire/QuestionnaireForm";
import { fetchSectionsServer } from "@/lib/services/questionnaire";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "치과 문진표",
  description: "치과 방문 전 환자 건강 정보 수집을 위한 디지털 문진표",
};

export default async function QuestionnairePage() {
  // Fetch sections on the server side to know if we have available questionnaire
  const sections = await fetchSectionsServer();

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">치과 문진표</h1>
        <p className="text-gray-600 mb-8 text-center">
          아래 질문에 모두 답변해 주시기 바랍니다. 환자의 건강 상태를 더 잘
          이해하는 데 도움이 됩니다.
        </p>
        <QuestionnaireForm />
      </div>
    </main>
  );
}
