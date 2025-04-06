"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

const OralFunction2Step: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { oralFunction2 } = data;

  const handleChange = (field: keyof typeof oralFunction2, value: any) => {
    updateResponse("oralFunction2", field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">구강 기능 평가 (2/2)</h2>
        <p className="text-gray-600 mt-2">
          씹기와 삼키기 기능에 관한 정보를 알려주세요.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold mb-2 text-blue-800">씹기 기능</h3>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                음식을 씹을 때 어느 쪽으로 주로 씹습니까?
              </Label>
              <RadioGroup
                name="chewingSide"
                options={[
                  { label: "오른쪽", value: "right" },
                  { label: "왼쪽", value: "left" },
                  { label: "양쪽 모두", value: "both" },
                  { label: "잘 모르겠음", value: "dont_know" },
                ]}
                value={oralFunction2.chewingSide || ""}
                onChange={(value) => handleChange("chewingSide", value)}
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
                딱딱한 음식(사과, 땅콩, 마른 오징어 등)을 씹는 것이 어렵습니까?
              </Label>
              <RadioGroup
                name="hardFoodDifficulty"
                options={[
                  { label: "전혀 어렵지 않음", value: "not_at_all" },
                  { label: "약간 어려움", value: "slightly" },
                  { label: "어느 정도 어려움", value: "moderately" },
                  { label: "상당히 어려움", value: "very" },
                  { label: "극도로 어려움/불가능", value: "extremely" },
                ]}
                value={oralFunction2.hardFoodDifficulty || ""}
                onChange={(value) => handleChange("hardFoodDifficulty", value)}
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
                음식을 완전히 씹기 전에 삼키는 경우가 있습니까?
              </Label>
              <RadioGroup
                name="swallowBeforeChewing"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralFunction2.swallowBeforeChewing || ""}
                onChange={(value) =>
                  handleChange("swallowBeforeChewing", value)
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
                씹을 때 턱에서 소리가 납니까?
              </Label>
              <RadioGroup
                name="jawSoundWhenChewing"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralFunction2.jawSoundWhenChewing || ""}
                onChange={(value) => handleChange("jawSoundWhenChewing", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold mb-2 text-blue-800">삼키기 기능</h3>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                물이나 음료를 마실 때 사레가 걸리는 경우가 있습니까?
              </Label>
              <RadioGroup
                name="chokingOnLiquids"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralFunction2.chokingOnLiquids || ""}
                onChange={(value) => handleChange("chokingOnLiquids", value)}
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
                음식을 삼킬 때 목에 걸리는 느낌이 있습니까?
              </Label>
              <RadioGroup
                name="foodStuckInThroat"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralFunction2.foodStuckInThroat || ""}
                onChange={(value) => handleChange("foodStuckInThroat", value)}
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
                음식을 삼킬 때 통증이 있습니까?
              </Label>
              <RadioGroup
                name="painWhenSwallowing"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralFunction2.painWhenSwallowing || ""}
                onChange={(value) => handleChange("painWhenSwallowing", value)}
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
                삼킨 후 목에 음식물이 남아있는 느낌이 있습니까?
              </Label>
              <RadioGroup
                name="residualFeelingAfterSwallowing"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralFunction2.residualFeelingAfterSwallowing || ""}
                onChange={(value) =>
                  handleChange("residualFeelingAfterSwallowing", value)
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
                최근 삼키기 능력이 변화했다고 느끼십니까?
              </Label>
              <RadioGroup
                name="swallowingAbilityChange"
                options={[
                  { label: "변화 없음", value: "no_change" },
                  { label: "약간 나빠짐", value: "slightly_worse" },
                  { label: "상당히 나빠짐", value: "moderately_worse" },
                  { label: "매우 나빠짐", value: "significantly_worse" },
                  { label: "오히려 좋아짐", value: "improved" },
                ]}
                value={oralFunction2.swallowingAbilityChange || ""}
                onChange={(value) =>
                  handleChange("swallowingAbilityChange", value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OralFunction2Step;
