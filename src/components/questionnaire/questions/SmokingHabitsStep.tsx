"use client";

import React, { useState } from "react";
import { SmokingHabitsData } from "@/lib/types";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormCard from "@/components/questionnaire/FormCard"
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

const SmokingHabitsStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { smokingHabits } = data;

  const handleChange = (field: keyof typeof smokingHabits, value: any) => {
    updateResponse("smokingHabits", field, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof typeof smokingHabits, value);
  };

  const showSmokingDetails =
    smokingHabits.smokingStatus === "current" ||
    smokingHabits.smokingStatus === "former";
  const showCurrentSmokerDetails = smokingHabits.smokingStatus === "current";
  const showFormerSmokerDetails = smokingHabits.smokingStatus === "former";

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">흡연 습관</h2>
        <p className="text-gray-600 mt-2">
          흡연 습관에 관한 정보를 알려주세요.
        </p>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                현재 흡연 상태를 선택해 주세요
              </Label>
              <RadioGroup
                name="smokingStatus"
                options={[
                  { label: "비흡연자", value: "never" },
                  { label: "현재 흡연자", value: "current" },
                  { label: "과거 흡연자", value: "former" },
                ]}
                value={smokingHabits.smokingStatus || ""}
                onChange={(value) => handleChange("smokingStatus", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {showSmokingDetails && (
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label className="font-medium">
                  흡연을 시작한 나이는 몇 살입니까?
                </Label>
                <RadioGroup
                  name="smokingStartAge"
                  options={[
                    { label: "15세 미만", value: "under_15" },
                    { label: "15-19세", value: "15_19" },
                    { label: "20-24세", value: "20_24" },
                    { label: "25-29세", value: "25_29" },
                    { label: "30세 이상", value: "30_or_above" },
                  ]}
                  value={smokingHabits.smokingStartAge || ""}
                  onChange={(value) => handleChange("smokingStartAge", value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {showCurrentSmokerDetails && (
        <>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">
                    하루에 평균 몇 개비를 피우십니까?
                  </Label>
                  <RadioGroup
                    name="cigarettesPerDay"
                    options={[
                      { label: "1-5개비", value: "1_5" },
                      { label: "6-10개비(반 갑)", value: "6_10" },
                      { label: "11-20개비(한 갑)", value: "11_20" },
                      { label: "21-40개비(두 갑)", value: "21_40" },
                      { label: "40개비 이상", value: "more_than_40" },
                    ]}
                    value={smokingHabits.cigarettesPerDay || ""}
                    onChange={(value) =>
                      handleChange("cigarettesPerDay", value)
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
                    주로 피우는 담배의 종류는 무엇입니까?
                  </Label>
                  <RadioGroup
                    name="smokingType"
                    options={[
                      { label: "일반 담배", value: "regular" },
                      { label: "전자담배", value: "electronic" },
                      { label: "가열담배(아이코스 등)", value: "heated" },
                      {
                        label: "일반 담배와 전자담배 혼용",
                        value: "regular_and_electronic",
                      },
                      {
                        label: "일반 담배와 가열담배 혼용",
                        value: "regular_and_heated",
                      },
                      { label: "기타", value: "other" },
                    ]}
                    value={smokingHabits.smokingType || ""}
                    onChange={(value) => handleChange("smokingType", value)}
                  />
                  {smokingHabits.smokingType === "other" && (
                    <div className="mt-2">
                      <Input
                        id="smokingTypeOther"
                        name="smokingTypeOther"
                        placeholder="기타 담배 종류를 입력해 주세요"
                        value={smokingHabits.smokingTypeOther || ""}
                        onChange={handleInputChange}
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
                    금연 시도를 해본 적이 있습니까?
                  </Label>
                  <RadioGroup
                    name="quitAttempts"
                    options={[
                      { label: "없음", value: "never" },
                      { label: "1-2회", value: "1_2_times" },
                      { label: "3-5회", value: "3_5_times" },
                      { label: "6회 이상", value: "more_than_6_times" },
                    ]}
                    value={smokingHabits.quitAttempts || ""}
                    onChange={(value) => handleChange("quitAttempts", value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {showFormerSmokerDetails && (
        <>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">
                    금연한 지 얼마나 되었습니까?
                  </Label>
                  <RadioGroup
                    name="quitDuration"
                    options={[
                      { label: "1개월 미만", value: "less_than_1_month" },
                      { label: "1-6개월", value: "1_6_months" },
                      { label: "7-12개월", value: "7_12_months" },
                      { label: "1-5년", value: "1_5_years" },
                      { label: "5년 이상", value: "more_than_5_years" },
                    ]}
                    value={smokingHabits.quitDuration || ""}
                    onChange={(value) => handleChange("quitDuration", value)}
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
                    금연 전 하루에 평균 몇 개비를 피우셨습니까?
                  </Label>
                  <RadioGroup
                    name="cigarettesPerDayBeforeQuitting"
                    options={[
                      { label: "1-5개비", value: "1_5" },
                      { label: "6-10개비(반 갑)", value: "6_10" },
                      { label: "11-20개비(한 갑)", value: "11_20" },
                      { label: "21-40개비(두 갑)", value: "21_40" },
                      { label: "40개비 이상", value: "more_than_40" },
                    ]}
                    value={smokingHabits.cigarettesPerDayBeforeQuitting || ""}
                    onChange={(value) =>
                      handleChange("cigarettesPerDayBeforeQuitting", value)
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
                  <Label className="font-medium">금연 이유는 무엇입니까?</Label>
                  <RadioGroup
                    name="quitReason"
                    options={[
                      { label: "건강상의 이유", value: "health_reasons" },
                      { label: "가족의 권유", value: "family_pressure" },
                      { label: "경제적 이유", value: "economic_reasons" },
                      { label: "임신/육아", value: "pregnancy_childcare" },
                      { label: "기타", value: "other" },
                    ]}
                    value={smokingHabits.quitReason || ""}
                    onChange={(value) => handleChange("quitReason", value)}
                  />
                  {smokingHabits.quitReason === "other" && (
                    <div className="mt-2">
                      <Input
                        id="quitReasonOther"
                        name="quitReasonOther"
                        placeholder="기타 금연 이유를 입력해 주세요"
                        value={smokingHabits.quitReasonOther || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                간접 흡연에 일상적으로 노출되어 있습니까?
              </Label>
              <RadioGroup
                name="secondhandSmokeExposure"
                options={[
                  { label: "예, 집에서", value: "yes_at_home" },
                  { label: "예, 직장에서", value: "yes_at_work" },
                  { label: "예, 기타 장소에서", value: "yes_elsewhere" },
                  { label: "아니오", value: "no" },
                ]}
                value={smokingHabits.secondhandSmokeExposure || ""}
                onChange={(value) =>
                  handleChange("secondhandSmokeExposure", value)
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
                흡연이 구강 건강에 영향을 미친다고 생각하십니까?
              </Label>
              <RadioGroup
                name="awarenessOfOralHealthImpact"
                options={[
                  { label: "매우 그렇다", value: "strongly_agree" },
                  { label: "그렇다", value: "agree" },
                  { label: "보통이다", value: "neutral" },
                  { label: "그렇지 않다", value: "disagree" },
                  { label: "전혀 그렇지 않다", value: "strongly_disagree" },
                ]}
                value={smokingHabits.awarenessOfOralHealthImpact || ""}
                onChange={(value) =>
                  handleChange("awarenessOfOralHealthImpact", value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmokingHabitsStep;
