"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { CheckboxGroup } from "@/components/ui/checkbox";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";
import { YesNoAnswer } from "@/lib/enums/questionnaire";
import { AllergiesHealthData } from "@/lib/types";
import { FormCard } from "@/components/questionnaire/FormCard";

const AllergiesHealthStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { allergiesHealth } = data;

  // Yes/No options
  const yesNoOptions = [
    { label: "예", value: YesNoAnswer.YES },
    { label: "아니오", value: YesNoAnswer.NO },
  ];

  // Supplement options
  const supplementOptions = [
    { label: "비타민", value: "vitamins" },
    { label: "미네랄", value: "minerals" },
    { label: "오메가-3", value: "omega3" },
    { label: "프로바이오틱스", value: "probiotics" },
    { label: "허브 보충제", value: "herbs" },
    { label: "단백질 보충제", value: "protein" },
    { label: "기타", value: "other" },
  ];

  const handleChange = (field: keyof AllergiesHealthData, value: any) => {
    updateResponse("allergiesHealth", field, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof AllergiesHealthData, value);
  };

  return (
    <FormCard title="알레르기 및 건강 상태">
      <div className="space-y-4">
        <div>
          <Label htmlFor="drugAllergy">약물 알레르기가 있으신가요?</Label>
          <RadioGroup
            name="drugAllergy"
            options={yesNoOptions}
            value={allergiesHealth?.drugAllergy || ""}
            onChange={(value) => handleChange("drugAllergy", value)}
            orientation="horizontal"
          />
        </div>

        {allergiesHealth?.drugAllergy === YesNoAnswer.YES && (
          <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
            <Label htmlFor="drugAllergyDetails">
              알레르기 반응을 일으키는 약물을 적어주세요
            </Label>
            <Input
              id="drugAllergyDetails"
              name="drugAllergyDetails"
              placeholder="예: 페니실린, 아스피린 등"
              value={allergiesHealth?.drugAllergyDetails || ""}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <Label htmlFor="foodAllergy">음식 알레르기가 있으신가요?</Label>
          <RadioGroup
            name="foodAllergy"
            options={yesNoOptions}
            value={allergiesHealth?.foodAllergy || ""}
            onChange={(value) => handleChange("foodAllergy", value)}
            orientation="horizontal"
          />
        </div>

        {allergiesHealth?.foodAllergy === YesNoAnswer.YES && (
          <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
            <Label htmlFor="foodAllergyDetails">
              알레르기 반응을 일으키는 음식을 적어주세요
            </Label>
            <Input
              id="foodAllergyDetails"
              name="foodAllergyDetails"
              placeholder="예: 땅콩, 조개류, 유제품 등"
              value={allergiesHealth?.foodAllergyDetails || ""}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <Label htmlFor="bloodCirculationMedication">
            혈액순환 관련 약물을 복용 중이신가요? (혈액 희석제, 항응고제 등)
          </Label>
          <RadioGroup
            name="bloodCirculationMedication"
            options={yesNoOptions}
            value={allergiesHealth?.bloodCirculationMedication || ""}
            onChange={(value) =>
              handleChange("bloodCirculationMedication", value)
            }
            orientation="horizontal"
          />
        </div>

        {allergiesHealth?.bloodCirculationMedication === YesNoAnswer.YES && (
          <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
            <Label htmlFor="bloodCirculationMedicationDetails">
              복용 중인 약물명과 용량을 적어주세요
            </Label>
            <Input
              id="bloodCirculationMedicationDetails"
              name="bloodCirculationMedicationDetails"
              placeholder="예: 와파린 5mg, 아스피린 100mg 등"
              value={allergiesHealth?.bloodCirculationMedicationDetails || ""}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <Label htmlFor="healthSupplements">
            정기적으로 복용하는 건강보조식품이 있으신가요?
          </Label>
          <CheckboxGroup
            name="healthSupplements"
            options={supplementOptions}
            values={allergiesHealth?.healthSupplements || []}
            onChange={(values) => handleChange("healthSupplements", values)}
          />
        </div>

        {allergiesHealth?.healthSupplements?.includes("other") && (
          <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
            <Label htmlFor="healthSupplementsOther">
              기타 복용 중인 건강보조식품을 적어주세요
            </Label>
            <Input
              id="healthSupplementsOther"
              name="healthSupplementsOther"
              placeholder="기타 건강보조식품"
              value={allergiesHealth?.healthSupplementsOther || ""}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
    </FormCard>
  );
};

export default AllergiesHealthStep;
