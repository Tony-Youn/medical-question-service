"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

const OralHealthHabits1Step: React.FC = () => {
  return (
    <div className="space-y-6">
      <p className="text-center text-gray-600">
        구강 건강 관리 습관에 대한 질문이 구현 중입니다.
      </p>
    </div>
  );
};

export default OralHealthHabits1Step;
