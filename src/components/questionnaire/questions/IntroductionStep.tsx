"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const IntroductionStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">안녕하세요!</h2>
        <p className="text-gray-600 mt-2">
          치과 문진표 작성을 시작합니다. 몇 가지 질문에 답변해 주세요.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">이 문진표의 목적</h3>
              <p className="text-gray-600">
                이 문진표는 귀하의 구강 건강 상태와 관련 생활 습관을 파악하여,
                더 나은 치과 진료와 맞춤형 치료 계획을 수립하기 위한 것입니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">예상 소요 시간</h3>
              <p className="text-gray-600">
                문진표 작성에는 약 15-20분이 소요됩니다. 정확한 정보 제공을 위해
                충분한 시간을 가지고 작성해 주세요.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">개인정보 보호</h3>
              <p className="text-gray-600">
                수집된 모든 정보는 진료 목적으로만 사용되며, 안전하게
                보호됩니다. 작성하신 정보는 의료진만 열람할 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">작성 방법</h3>
              <p className="text-gray-600">
                각 문항에 대해 가능한 정확하게 답변해 주시고, 모르는 항목이
                있다면 의료진에게 문의해 주세요. 모든 정보는 귀하의 건강 관리에
                중요합니다.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-md">
            <p className="text-blue-700">
              '다음' 버튼을 클릭하여 문진표 작성을 시작하세요. 언제든지 '이전'
              버튼을 눌러 답변을 수정할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroductionStep;
