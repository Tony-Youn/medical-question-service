"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SleepOralKnowledgeStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { sleepOralKnowledge } = data;

  const handleChange = (field: keyof typeof sleepOralKnowledge, value: any) => {
    updateResponse("sleepOralKnowledge", field, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof typeof sleepOralKnowledge, value);
  };

  const showSleepDissatisfactionField =
    sleepOralKnowledge.sleepSatisfaction === "unsatisfied" ||
    sleepOralKnowledge.sleepSatisfaction === "very_unsatisfied";

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">수면 패턴 및 구강건강 지식</h2>
        <p className="text-gray-600 mt-2">
          수면 패턴과 구강건강 지식에 대해 알려주세요.
        </p>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                현재 수면 양상 만족도를 선택해 주세요
              </Label>
              <RadioGroup
                name="sleepSatisfaction"
                options={[
                  { label: "매우 만족", value: "very_satisfied" },
                  { label: "만족", value: "satisfied" },
                  { label: "보통", value: "neutral" },
                  { label: "불만족", value: "unsatisfied" },
                  { label: "매우 불만족", value: "very_unsatisfied" },
                ]}
                value={sleepOralKnowledge.sleepSatisfaction || ""}
                onChange={(value) => handleChange("sleepSatisfaction", value)}
              />
            </div>

            {showSleepDissatisfactionField && (
              <div>
                <Label
                  className="font-medium"
                  htmlFor="sleepDissatisfactionReason"
                >
                  수면 문제 원인을 선택해 주세요
                </Label>
                <RadioGroup
                  name="sleepDissatisfactionReason"
                  options={[
                    { label: "스트레스로 인해", value: "stress" },
                    { label: "현재 앓고 있는 질병으로 인해", value: "illness" },
                    {
                      label: "직업 특성상 불규칙한 취침으로 인해",
                      value: "irregular_sleep",
                    },
                    { label: "기타", value: "other" },
                  ]}
                  value={sleepOralKnowledge.sleepDissatisfactionReason || ""}
                  onChange={(value) =>
                    handleChange("sleepDissatisfactionReason", value)
                  }
                />
                {sleepOralKnowledge.sleepDissatisfactionReason === "other" && (
                  <div className="mt-2">
                    <Input
                      id="sleepDissatisfactionReasonOther"
                      name="sleepDissatisfactionReasonOther"
                      placeholder="기타 원인을 입력해 주세요"
                      value={
                        sleepOralKnowledge.sleepDissatisfactionReasonOther || ""
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                코골이가 거의 매일 있습니까?
              </Label>
              <RadioGroup
                name="snoringFrequency"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={sleepOralKnowledge.snoringFrequency || ""}
                onChange={(value) => handleChange("snoringFrequency", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">기상 시 입마름이 있습니까?</Label>
              <RadioGroup
                name="dryMouthUponWaking"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={sleepOralKnowledge.dryMouthUponWaking || ""}
                onChange={(value) => handleChange("dryMouthUponWaking", value)}
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
                수면 중 호흡 곤란을 경험합니까?
              </Label>
              <RadioGroup
                name="breathingDifficultyDuringSleep"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={sleepOralKnowledge.breathingDifficultyDuringSleep || ""}
                onChange={(value) =>
                  handleChange("breathingDifficultyDuringSleep", value)
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
                이갈이 경험 여부를 선택해 주세요
              </Label>
              <RadioGroup
                name="teethGrinding"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={sleepOralKnowledge.teethGrinding || ""}
                onChange={(value) => handleChange("teethGrinding", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">만성 피로감이 있습니까?</Label>
              <RadioGroup
                name="chronicFatigue"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={sleepOralKnowledge.chronicFatigue || ""}
                onChange={(value) => handleChange("chronicFatigue", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">기상 시 두통이 있습니까?</Label>
              <RadioGroup
                name="headachesUponWaking"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={sleepOralKnowledge.headachesUponWaking || ""}
                onChange={(value) => handleChange("headachesUponWaking", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2 text-blue-800">구강건강 지식</h3>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                치아우식(충치) 발생 원인을 선택해 주세요
              </Label>
              <RadioGroup
                name="dentalCariesCause"
                options={[
                  {
                    label: "단 것을 먹고 이를 닦지 않아서 발생된다",
                    value: "sweets_and_no_brushing",
                  },
                  { label: "나이가 들면서 저절로 발생된다", value: "aging" },
                  { label: "저절로 발생된다", value: "naturally" },
                  { label: "잘 모르겠다", value: "dont_know" },
                ]}
                value={sleepOralKnowledge.dentalCariesCause || ""}
                onChange={(value) => handleChange("dentalCariesCause", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">충치 예방법을 선택해 주세요</Label>
              <RadioGroup
                name="dentalCariesPrevention"
                options={[
                  { label: "치아를 깨끗이 닦는다", value: "clean_teeth" },
                  {
                    label: "정기적으로 구강검진을 받는다",
                    value: "regular_checkups",
                  },
                  { label: "단 음식을 피한다", value: "avoid_sweets" },
                  { label: "잘 모르겠다", value: "dont_know" },
                ]}
                value={sleepOralKnowledge.dentalCariesPrevention || ""}
                onChange={(value) =>
                  handleChange("dentalCariesPrevention", value)
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
                현재 사용 중인 치약에 불소가 함유되어 있습니까?
              </Label>
              <RadioGroup
                name="fluorideToothpaste"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                  { label: "모름", value: "dont_know" },
                ]}
                value={sleepOralKnowledge.fluorideToothpaste || ""}
                onChange={(value) => handleChange("fluorideToothpaste", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepOralKnowledgeStep;
