"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";
import { YesNoAnswer } from "@/lib/enums/questionnaire";
import FormCard from "@/components/questionnaire/FormCard"
import { MedicalHistoryData } from "@/lib/types";

const MedicalHistoryStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { medicalHistory } = data;

  // Yes/No options
  const yesNoOptions = [
    { label: "예", value: YesNoAnswer.YES },
    { label: "아니오", value: YesNoAnswer.NO },
  ];

  // Disease history options
  const diseaseHistoryOptions = [
    { label: "현재 질환이 있음", value: "current" },
    { label: "과거 질환 병력이 있음", value: "past" },
    { label: "질환 병력 없음", value: "none" },
  ];

  const handleChange = (field: keyof MedicalHistoryData, value: any) => {
    updateResponse("medicalHistory", field, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof MedicalHistoryData, value);
  };

  return (
    <FormCard title="의료 이력">
      <div className="space-y-4">
        <div>
          <Label>질환 이력에 대해 알려주세요</Label>
          <RadioGroup
            name="diseaseHistory"
            options={diseaseHistoryOptions}
            value={medicalHistory.diseaseHistory || ""}
            onChange={(value) => handleChange("diseaseHistory", value)}
          />
        </div>

        {medicalHistory.diseaseHistory === "past" && (
          <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
            <Label htmlFor="pastDiseaseDetails">
              과거 질환에 대해 자세히 알려주세요
            </Label>
            <Input
              id="pastDiseaseDetails"
              name="pastDiseaseDetails"
              placeholder="과거 질환 내용을 입력하세요"
              value={medicalHistory.pastDiseaseDetails || ""}
              onChange={handleInputChange}
            />
          </div>
        )}

        {medicalHistory.diseaseHistory === "current" && (
          <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
            <Label>여러 개의 질환을 앓고 계신가요?</Label>
            <RadioGroup
              name="multipleCurrentDiseases"
              options={yesNoOptions}
              value={medicalHistory.multipleCurrentDiseases || ""}
              onChange={(value) =>
                handleChange("multipleCurrentDiseases", value)
              }
              orientation="horizontal"
            />
          </div>
        )}

        <div>
          <Label>주사 또는 투석 치료를 받고 계신가요?</Label>
          <RadioGroup
            name="injectionDialysisTreatment"
            options={yesNoOptions}
            value={medicalHistory.injectionDialysisTreatment || ""}
            onChange={(value) =>
              handleChange("injectionDialysisTreatment", value)
            }
            orientation="horizontal"
          />
        </div>
      </div>
    </FormCard>
  );
};

export default MedicalHistoryStep;
