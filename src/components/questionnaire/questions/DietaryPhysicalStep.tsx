"use client";

import React from "react";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CheckboxGroup } from "@/components/ui/checkbox";
import { DietaryPhysicalData } from "@/lib/types";
import FormCard from "@/components/questionnaire/FormCard"

const DietaryPhysicalStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { dietaryPhysical } = data;

  const handleChange = (field: keyof DietaryPhysicalData, value: any) => {
    updateResponse("dietaryPhysical", field, value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof DietaryPhysicalData, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof DietaryPhysicalData, value);
  };

  // Exercise types options
  const exerciseTypesOptions = [
    { label: "걷기/달리기", value: "walking_running" },
    { label: "수영", value: "swimming" },
    { label: "자전거", value: "cycling" },
    { label: "웨이트 트레이닝", value: "weight_training" },
    { label: "요가/필라테스", value: "yoga_pilates" },
    { label: "단체 스포츠", value: "team_sports" },
    { label: "기타", value: "other" },
  ];

  return (
    <FormCard title="식습관 및 신체활동">
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2 text-blue-800">식습관</h3>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  하루 평균 식사 횟수를 선택해 주세요
                </Label>
                <RadioGroup
                  name="mealsPerDay"
                  options={[
                    { label: "1회", value: "1" },
                    { label: "2회", value: "2" },
                    { label: "3회", value: "3" },
                    { label: "4회 이상", value: "4_or_more" },
                    { label: "불규칙함", value: "irregular" },
                  ]}
                  value={dietaryPhysical.mealsPerDay || ""}
                  onChange={(value) => handleChange("mealsPerDay", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  하루 평균 간식 섭취 횟수를 선택해 주세요
                </Label>
                <RadioGroup
                  name="snacksPerDay"
                  options={[
                    { label: "0회", value: "0" },
                    { label: "1-2회", value: "1_2" },
                    { label: "3-4회", value: "3_4" },
                    { label: "5회 이상", value: "5_or_more" },
                  ]}
                  value={dietaryPhysical.snacksPerDay || ""}
                  onChange={(value) => handleChange("snacksPerDay", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  식사 시 충분히 씹는 편인가요?
                </Label>
                <RadioGroup
                  name="chewingThoroughly"
                  options={[
                    { label: "매우 그렇다", value: "very_much" },
                    { label: "그렇다", value: "somewhat" },
                    { label: "보통이다", value: "neutral" },
                    { label: "그렇지 않다", value: "not_really" },
                    { label: "전혀 그렇지 않다", value: "not_at_all" },
                  ]}
                  value={dietaryPhysical.chewingThoroughly || ""}
                  onChange={(value) => handleChange("chewingThoroughly", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  단 음식이나 간식을 얼마나 자주 섭취하시나요?
                </Label>
                <RadioGroup
                  name="sweetFoodConsumption"
                  options={[
                    { label: "거의 매일", value: "almost_daily" },
                    { label: "주 3-5회", value: "3_5_per_week" },
                    { label: "주 1-2회", value: "1_2_per_week" },
                    { label: "월 1-3회", value: "1_3_per_month" },
                    { label: "거의 먹지 않음", value: "rarely" },
                  ]}
                  value={dietaryPhysical.sweetFoodConsumption || ""}
                  onChange={(value) =>
                    handleChange("sweetFoodConsumption", value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  탄산음료를 얼마나 자주 마시나요?
                </Label>
                <RadioGroup
                  name="sodaConsumption"
                  options={[
                    { label: "거의 매일", value: "almost_daily" },
                    { label: "주 3-5회", value: "3_5_per_week" },
                    { label: "주 1-2회", value: "1_2_per_week" },
                    { label: "월 1-3회", value: "1_3_per_month" },
                    { label: "거의 마시지 않음", value: "rarely" },
                  ]}
                  value={dietaryPhysical.sodaConsumption || ""}
                  onChange={(value) => handleChange("sodaConsumption", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  식사 후 칫솔질은 얼마나 자주 하시나요?
                </Label>
                <RadioGroup
                  name="oralHygieneAfterSugaryFood"
                  options={[
                    { label: "매 식사 후", value: "after_every_meal" },
                    { label: "하루에 2번", value: "twice_daily" },
                    { label: "하루에 1번", value: "once_daily" },
                    { label: "가끔", value: "occasionally" },
                    { label: "거의 하지 않음", value: "rarely" },
                  ]}
                  value={dietaryPhysical.oralHygieneAfterSugaryFood || ""}
                  onChange={(value) =>
                    handleChange("oralHygieneAfterSugaryFood", value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2 text-blue-800">신체활동</h3>
        </div>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  평균적으로 일주일에 몇 회 운동하시나요?
                </Label>
                <RadioGroup
                  name="exerciseFrequency"
                  options={[
                    { label: "전혀 하지 않음", value: "never" },
                    { label: "주 1-2회", value: "1_2_per_week" },
                    { label: "주 3-4회", value: "3_4_per_week" },
                    { label: "주 5회 이상", value: "5_or_more_per_week" },
                    { label: "매일", value: "daily" },
                  ]}
                  value={dietaryPhysical.exerciseFrequency || ""}
                  onChange={(value) => handleChange("exerciseFrequency", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  운동하는 경우, 평균 운동 시간은 얼마나 되나요?
                </Label>
                <RadioGroup
                  name="exerciseDuration"
                  options={[
                    { label: "30분 미만", value: "less_than_30min" },
                    { label: "30분-1시간", value: "30min_to_1hour" },
                    { label: "1-2시간", value: "1_to_2_hours" },
                    { label: "2시간 이상", value: "more_than_2_hours" },
                  ]}
                  value={dietaryPhysical.exerciseDuration || ""}
                  onChange={(value) => handleChange("exerciseDuration", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  주로 하는 운동 종류는 무엇인가요? (복수 선택 가능)
                </Label>
                <CheckboxGroup
                  name="exerciseTypes"
                  options={exerciseTypesOptions}
                  values={dietaryPhysical.exerciseTypes || []}
                  onChange={(values) => handleChange("exerciseTypes", values)}
                />

                {dietaryPhysical.exerciseTypes?.includes("other") && (
                  <div className="mt-2">
                    <Label htmlFor="exerciseTypesOther">
                      기타 운동 (직접 입력)
                    </Label>
                    <Input
                      id="exerciseTypesOther"
                      name="exerciseTypesOther"
                      value={dietaryPhysical.exerciseTypesOther || ""}
                      onChange={handleInputChange}
                      placeholder="기타 운동을 입력하세요"
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  하루 평균 앉아있는 시간은 얼마나 되나요?
                </Label>
                <RadioGroup
                  name="sittingHoursPerDay"
                  options={[
                    { label: "4시간 미만", value: "less_than_4" },
                    { label: "4-8시간", value: "4_to_8" },
                    { label: "8-12시간", value: "8_to_12" },
                    { label: "12시간 이상", value: "more_than_12" },
                  ]}
                  value={dietaryPhysical.sittingHoursPerDay || ""}
                  onChange={(value) =>
                    handleChange("sittingHoursPerDay", value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="additionalDietaryInfo" className="font-medium">
                  추가적인 식습관이나 신체활동에 관한 정보가 있다면 알려주세요
                </Label>
                <Textarea
                  id="additionalDietaryInfo"
                  name="additionalDietaryInfo"
                  value={dietaryPhysical.additionalDietaryInfo || ""}
                  onChange={handleTextareaChange}
                  placeholder="추가 정보를 입력하세요"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </FormCard>
  );
};

export default DietaryPhysicalStep;
