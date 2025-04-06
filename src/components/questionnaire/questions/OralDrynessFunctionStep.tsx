"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

const OralDrynessFunctionStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { oralDrynessFunction } = data;

  const handleChange = (
    field: keyof typeof oralDrynessFunction,
    value: any
  ) => {
    updateResponse("oralDrynessFunction", field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">구강 건조감 평가</h2>
        <p className="text-gray-600 mt-2">
          구강 건조감에 관한 정보를 알려주세요.
        </p>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">입이 마른다고 느끼십니까?</Label>
              <RadioGroup
                name="feelsDryness"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.feelsDryness || ""}
                onChange={(value) => handleChange("feelsDryness", value)}
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
                식사를 할 때 입안이 마르다고 느끼십니까?
              </Label>
              <RadioGroup
                name="drynessWhenEating"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.drynessWhenEating || ""}
                onChange={(value) => handleChange("drynessWhenEating", value)}
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
                마른 음식을 삼키기 위해 물이나 음료를 마셔야 합니까?
              </Label>
              <RadioGroup
                name="needLiquidToSwallow"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.needLiquidToSwallow || ""}
                onChange={(value) => handleChange("needLiquidToSwallow", value)}
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
                잠자리에서 갈증을 느끼십니까?
              </Label>
              <RadioGroup
                name="thirstAtNight"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.thirstAtNight || ""}
                onChange={(value) => handleChange("thirstAtNight", value)}
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
                구강 건조감으로 인해 껌이나 사탕을 자주 섭취하십니까?
              </Label>
              <RadioGroup
                name="useCandyForDryness"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.useCandyForDryness || ""}
                onChange={(value) => handleChange("useCandyForDryness", value)}
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
                식사 시 입안에 음식물이 붙어 불편함을 느끼십니까?
              </Label>
              <RadioGroup
                name="foodSticksInMouth"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.foodSticksInMouth || ""}
                onChange={(value) => handleChange("foodSticksInMouth", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold mb-2 text-blue-800">입냄새</h3>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                본인의 입냄새가 신경 쓰이십니까?
              </Label>
              <RadioGroup
                name="badBreathConcern"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.badBreathConcern || ""}
                onChange={(value) => handleChange("badBreathConcern", value)}
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
                타인으로부터 입냄새에 대한 지적을 받은 적이 있습니까?
              </Label>
              <RadioGroup
                name="othersMentionedBadBreath"
                options={[
                  { label: "전혀 없음", value: "never" },
                  { label: "거의 없음", value: "rarely" },
                  { label: "가끔", value: "sometimes" },
                  { label: "자주", value: "often" },
                  { label: "항상", value: "always" },
                ]}
                value={oralDrynessFunction.othersMentionedBadBreath || ""}
                onChange={(value) =>
                  handleChange("othersMentionedBadBreath", value)
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
                입냄새 예방을 위해 특별히 하는 행동이 있습니까?
              </Label>
              <RadioGroup
                name="badBreathPrevention"
                options={[
                  { label: "없음", value: "none" },
                  { label: "껌이나 사탕을 자주 씹음", value: "gum_candy" },
                  { label: "구강청결제를 자주 사용", value: "mouthwash" },
                  { label: "칫솔질을 더 자주함", value: "brushing_more" },
                  { label: "물을 많이 마심", value: "drinking_water" },
                ]}
                value={oralDrynessFunction.badBreathPrevention || ""}
                onChange={(value) => handleChange("badBreathPrevention", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OralDrynessFunctionStep;
