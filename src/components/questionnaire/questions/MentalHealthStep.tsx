"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";
import { Textarea } from "@/components/ui/textarea";

const MentalHealthStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { mentalHealth } = data;

  const handleChange = (field: keyof typeof mentalHealth, value: any) => {
    updateResponse("mentalHealth", field, value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof typeof mentalHealth, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">정신 건강 평가</h2>
        <p className="text-gray-600 mt-2">
          정신 건강 상태를 평가하기 위한 몇 가지 질문입니다. 가장 적합한 답변을
          선택해 주세요.
        </p>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                최근 2주간 기분이 가라앉거나, 우울하거나, 희망이 없다고
                느꼈습니까?
              </Label>
              <RadioGroup
                name="feelingDown"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.feelingDown || ""}
                onChange={(value) => handleChange("feelingDown", value)}
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
                최근 2주간 일상 활동에 대한 흥미나 즐거움이 감소했습니까?
              </Label>
              <RadioGroup
                name="lackOfInterest"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.lackOfInterest || ""}
                onChange={(value) => handleChange("lackOfInterest", value)}
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
                최근 2주간 잠들기 어렵거나, 자주 깨거나, 또는 너무 많이
                잤습니까?
              </Label>
              <RadioGroup
                name="sleepIssues"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.sleepIssues || ""}
                onChange={(value) => handleChange("sleepIssues", value)}
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
                최근 2주간 피곤하다고 느끼거나 기운이 거의 없었습니까?
              </Label>
              <RadioGroup
                name="fatigue"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.fatigue || ""}
                onChange={(value) => handleChange("fatigue", value)}
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
                최근 2주간 식욕이 줄거나 과식했습니까?
              </Label>
              <RadioGroup
                name="appetiteChanges"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.appetiteChanges || ""}
                onChange={(value) => handleChange("appetiteChanges", value)}
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
                최근 2주간 자신에 대해 부정적으로 느끼거나 실패자라고
                느껴졌습니까?
              </Label>
              <RadioGroup
                name="negativeFeelingsAboutSelf"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.negativeFeelingsAboutSelf || ""}
                onChange={(value) =>
                  handleChange("negativeFeelingsAboutSelf", value)
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
                최근 2주간 집중하기 어려웠습니까?
              </Label>
              <RadioGroup
                name="concentrationIssues"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.concentrationIssues || ""}
                onChange={(value) => handleChange("concentrationIssues", value)}
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
                최근 2주간 너무 느리게 움직이거나 반대로 너무 안절부절 못하고
                초조했습니까?
              </Label>
              <RadioGroup
                name="psychomotorChanges"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.psychomotorChanges || ""}
                onChange={(value) => handleChange("psychomotorChanges", value)}
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
                최근 2주간 자해 또는 자살에 대한 생각이 있었습니까?
              </Label>
              <RadioGroup
                name="suicidalThoughts"
                options={[
                  { label: "전혀 없음", value: "not_at_all" },
                  { label: "며칠 동안", value: "several_days" },
                  { label: "1주일 이상", value: "more_than_a_week" },
                  { label: "거의 매일", value: "nearly_every_day" },
                ]}
                value={mentalHealth.suicidalThoughts || ""}
                onChange={(value) => handleChange("suicidalThoughts", value)}
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
                최근 정신건강 문제로 도움을 받은 적이 있습니까?
              </Label>
              <RadioGroup
                name="seekedMentalHealthHelp"
                options={[
                  {
                    label: "아니오, 도움이 필요하지 않았습니다",
                    value: "no_not_needed",
                  },
                  {
                    label: "아니오, 하지만 도움이 필요했습니다",
                    value: "no_but_needed",
                  },
                  {
                    label: "예, 전문가의 도움을 받았습니다",
                    value: "yes_professional_help",
                  },
                  {
                    label: "예, 약물 치료를 받았습니다",
                    value: "yes_medication",
                  },
                  {
                    label: "예, 전문가 상담과 약물 치료 모두 받았습니다",
                    value: "yes_both",
                  },
                ]}
                value={mentalHealth.seekedMentalHealthHelp || ""}
                onChange={(value) =>
                  handleChange("seekedMentalHealthHelp", value)
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
              <Label
                className="font-medium"
                htmlFor="additionalMentalHealthInfo"
              >
                추가로 공유하고 싶은 정신건강 관련 정보가 있으면 입력해 주세요
              </Label>
              <Textarea
                id="additionalMentalHealthInfo"
                name="additionalMentalHealthInfo"
                className="mt-2"
                placeholder="추가 정보를 입력해 주세요"
                value={mentalHealth.additionalMentalHealthInfo || ""}
                onChange={handleTextareaChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthStep;
