"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

const CompletionStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { completion } = data;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateResponse("completion", name as keyof typeof completion, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">문진표 작성 완료</h2>
        <p className="text-gray-600 mt-2">
          질문에 답변해 주셔서 감사합니다. 작성한 내용을 확인하고 제출해 주세요.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="contactInformation">추가 연락처 (선택사항)</Label>
              <p className="text-sm text-gray-500 mb-3">
                추가 정보가 필요한 경우 연락드릴 수 있도록 전화번호를
                남겨주세요.
              </p>
              <Input
                id="contactInformation"
                name="contactInformation"
                placeholder="전화번호를 입력하세요"
                value={completion.contactInformation || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-md">
              <p className="text-blue-700 font-medium">
                '제출하기' 버튼을 클릭하여 문진표 작성을 완료해 주세요.
              </p>
              <p className="text-blue-700 text-sm mt-1">
                귀하의 소중한 정보는 안전하게 보호되며, 더 나은 치과 진료를 위해
                사용됩니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletionStep;
