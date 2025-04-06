"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";
import {
  Gender,
  Nationality,
  EducationLevel,
  HouseholdComposition,
  YesNoAnswer,
  InterestLevel,
} from "@/lib/enums/questionnaire";
import { FormCard } from "@/components/questionnaire/FormCard";

const BasicInfoStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { basicInfo } = data;

  // Gender options
  const genderOptions = [
    { label: "남성", value: Gender.MALE },
    { label: "여성", value: Gender.FEMALE },
    { label: "기타", value: Gender.OTHER },
  ];

  // Nationality options
  const nationalityOptions = [
    { label: "한국인", value: Nationality.KOREAN },
    { label: "외국인", value: Nationality.FOREIGNER },
  ];

  // Education level options
  const educationOptions = [
    { label: "중학교 졸업 이하", value: EducationLevel.MIDDLE_SCHOOL },
    { label: "고등학교 졸업", value: EducationLevel.HIGH_SCHOOL },
    { label: "대학교 졸업 이상", value: EducationLevel.COLLEGE },
  ];

  // Household composition options
  const householdOptions = [
    { label: "1인 가구", value: HouseholdComposition.SINGLE },
    { label: "다인 가구", value: HouseholdComposition.MULTIPLE },
  ];

  // Yes/No options
  const yesNoOptions = [
    { label: "예", value: YesNoAnswer.YES },
    { label: "아니오", value: YesNoAnswer.NO },
  ];

  // Interest level options
  const interestOptions = [
    { label: "매우 높음", value: InterestLevel.VERY_HIGH },
    { label: "높음", value: InterestLevel.HIGH },
    { label: "보통", value: InterestLevel.MODERATE },
    { label: "낮음", value: InterestLevel.LOW },
    { label: "매우 낮음", value: InterestLevel.VERY_LOW },
  ];

  const handleChange = (field: keyof typeof basicInfo, value: any) => {
    updateResponse("basicInfo", field, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof typeof basicInfo, value);
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value ? parseInt(value, 10) : null;
    handleChange(name as keyof typeof basicInfo, numericValue);
  };

  return (
    <FormCard title="기본 정보">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력하세요"
            value={basicInfo.name || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Label htmlFor="age">나이</Label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="나이를 입력하세요"
            value={basicInfo.age !== null ? basicInfo.age : ""}
            onChange={handleNumberInputChange}
            min={1}
            max={120}
          />
        </div>

        <div>
          <Label>성별</Label>
          <RadioGroup
            name="gender"
            options={genderOptions}
            value={basicInfo.gender || ""}
            onChange={(value) => handleChange("gender", value)}
            orientation="horizontal"
          />
        </div>

        <div>
          <Label>국적</Label>
          <RadioGroup
            name="nationality"
            options={nationalityOptions}
            value={basicInfo.nationality || ""}
            onChange={(value) => handleChange("nationality", value)}
            orientation="horizontal"
          />
        </div>

        {basicInfo.nationality === Nationality.FOREIGNER && (
          <div>
            <Label htmlFor="foreignCountry">국가명</Label>
            <Input
              id="foreignCountry"
              name="foreignCountry"
              placeholder="국가명을 입력하세요"
              value={basicInfo.foreignCountry || ""}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <Label>교육 수준</Label>
          <RadioGroup
            name="educationLevel"
            options={educationOptions}
            value={basicInfo.educationLevel || ""}
            onChange={(value) => handleChange("educationLevel", value)}
          />
        </div>

        <div>
          <Label>가구 구성</Label>
          <RadioGroup
            name="householdComposition"
            options={householdOptions}
            value={basicInfo.householdComposition || ""}
            onChange={(value) => handleChange("householdComposition", value)}
            orientation="horizontal"
          />
        </div>

        <div>
          <Label>경제활동 여부</Label>
          <RadioGroup
            name="economicActivity"
            options={yesNoOptions}
            value={basicInfo.economicActivity || ""}
            onChange={(value) => handleChange("economicActivity", value)}
            orientation="horizontal"
          />
        </div>

        <div>
          <Label>치과보험 가입 여부</Label>
          <RadioGroup
            name="dentalInsurance"
            options={yesNoOptions}
            value={basicInfo.dentalInsurance || ""}
            onChange={(value) => handleChange("dentalInsurance", value)}
            orientation="horizontal"
          />
        </div>

        <div>
          <Label>구강건강에 대한 관심도</Label>
          <RadioGroup
            name="oralHealthInterest"
            options={interestOptions}
            value={basicInfo.oralHealthInterest || ""}
            onChange={(value) => handleChange("oralHealthInterest", value)}
          />
        </div>
      </div>
    </FormCard>
  );
};

export default BasicInfoStep;
