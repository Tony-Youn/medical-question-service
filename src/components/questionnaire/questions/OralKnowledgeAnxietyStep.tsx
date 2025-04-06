"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

const OralKnowledgeAnxietyStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { oralKnowledgeAnxiety } = data;

  const handleChange = (
    field: keyof typeof oralKnowledgeAnxiety,
    value: any
  ) => {
    updateResponse("oralKnowledgeAnxiety", field, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">구강건강 지식 및 치과 불안</h2>
        <p className="text-gray-600 mt-2">
          구강건강 지식과 치과 방문에 대한 느낌을 알려주세요.
        </p>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                치주염 발생 원인을 선택해 주세요
              </Label>
              <RadioGroup
                name="periodontitisUnderstanding"
                options={[
                  {
                    label: "이를 잘 닦지 않아 치석이 쌓여 발생된다",
                    value: "plaque",
                  },
                  { label: "나이가 들면서 저절로 발생된다", value: "aging" },
                  { label: "바이러스에 감염되어 발생된다", value: "virus" },
                  { label: "잘 모르겠다", value: "unknown" },
                ]}
                value={oralKnowledgeAnxiety.periodontitisUnderstanding || ""}
                onChange={(value) =>
                  handleChange("periodontitisUnderstanding", value)
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
                치주염과 흡연의 상관관계가 있다고 생각하십니까?
              </Label>
              <RadioGroup
                name="smokingPeriodontalCorrelation"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                  { label: "모름", value: "unknown" },
                ]}
                value={oralKnowledgeAnxiety.smokingPeriodontalCorrelation || ""}
                onChange={(value) =>
                  handleChange("smokingPeriodontalCorrelation", value)
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
                임플란트/틀니 치료 후 정기검진이 필수라고 생각하십니까?
              </Label>
              <RadioGroup
                name="implantDentureMaintenanceKnowledge"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={
                  oralKnowledgeAnxiety.implantDentureMaintenanceKnowledge || ""
                }
                onChange={(value) =>
                  handleChange("implantDentureMaintenanceKnowledge", value)
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
                성인 스케일링 건강보험 적용 사실을 알고 계십니까?
              </Label>
              <RadioGroup
                name="dentalInsuranceAwareness"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={oralKnowledgeAnxiety.dentalInsuranceAwareness || ""}
                onChange={(value) =>
                  handleChange("dentalInsuranceAwareness", value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2 text-blue-800">치과 불안 평가</h3>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                내일 치과 방문에 대한 기분을 선택해 주세요
              </Label>
              <RadioGroup
                name="tomorrowDentalVisitFeeling"
                options={[
                  { label: "기대가 된다", value: "looking_forward" },
                  { label: "신경쓰지 않는다", value: "dont_mind" },
                  { label: "약간 신경쓰인다", value: "slightly_nervous" },
                  { label: "불편하거나 아플까봐 걱정된다", value: "worried" },
                ]}
                value={oralKnowledgeAnxiety.tomorrowDentalVisitFeeling || ""}
                onChange={(value) =>
                  handleChange("tomorrowDentalVisitFeeling", value)
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
                치과 의자에서 대기 중 느끼는 기분을 선택해 주세요
              </Label>
              <RadioGroup
                name="waitingRoomFeeling"
                options={[
                  { label: "편하다", value: "comfortable" },
                  { label: "약간 신경쓰인다", value: "slightly_nervous" },
                  { label: "긴장된다", value: "tense" },
                  { label: "불안하다", value: "anxious" },
                ]}
                value={oralKnowledgeAnxiety.waitingRoomFeeling || ""}
                onChange={(value) => handleChange("waitingRoomFeeling", value)}
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
                충치 치료 준비 중 느끼는 기분을 선택해 주세요
              </Label>
              <RadioGroup
                name="cavityTreatmentFeeling"
                options={[
                  { label: "편하다", value: "comfortable" },
                  { label: "약간 신경쓰인다", value: "slightly_nervous" },
                  { label: "긴장된다", value: "tense" },
                  { label: "불안하다", value: "anxious" },
                ]}
                value={oralKnowledgeAnxiety.cavityTreatmentFeeling || ""}
                onChange={(value) =>
                  handleChange("cavityTreatmentFeeling", value)
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
                치아/잇몸 스케일링 중 느끼는 기분을 선택해 주세요
              </Label>
              <RadioGroup
                name="scalingFeeling"
                options={[
                  { label: "편하다", value: "comfortable" },
                  { label: "약간 신경쓰인다", value: "slightly_nervous" },
                  { label: "긴장된다", value: "tense" },
                  { label: "불안하다", value: "anxious" },
                ]}
                value={oralKnowledgeAnxiety.scalingFeeling || ""}
                onChange={(value) => handleChange("scalingFeeling", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OralKnowledgeAnxietyStep;
