"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group-adapter";
import { Card, CardContent } from "@/components/ui/card";
import { useQuestionnaireStore } from "@/lib/store/questionnaire";

const DrinkingDietaryStep: React.FC = () => {
  const { data, updateResponse } = useQuestionnaireStore();
  const { drinkingDietary } = data;

  const handleChange = (field: keyof typeof drinkingDietary, value: any) => {
    updateResponse("drinkingDietary", field, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof typeof drinkingDietary, value);
  };

  const showAlcoholDetails = drinkingDietary.alcoholConsumption === "yes";

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">음주 및 식이 습관</h2>
        <p className="text-gray-600 mt-2">
          음주 습관과 식이 습관에 관한 정보를 알려주세요.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold mb-2 text-blue-800">음주 습관</h3>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">술을 마십니까?</Label>
              <RadioGroup
                name="alcoholConsumption"
                options={[
                  { label: "예", value: "yes" },
                  { label: "아니오", value: "no" },
                ]}
                value={drinkingDietary.alcoholConsumption || ""}
                onChange={(value) => handleChange("alcoholConsumption", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {showAlcoholDetails && (
        <>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label className="font-medium">
                    일주일에 평균 몇 회 술을 마십니까?
                  </Label>
                  <RadioGroup
                    name="alcoholFrequencyPerWeek"
                    options={[
                      { label: "주 1회 미만", value: "less_than_once" },
                      { label: "주 1-2회", value: "1_2_times" },
                      { label: "주 3-4회", value: "3_4_times" },
                      { label: "주 5회 이상", value: "5_or_more_times" },
                    ]}
                    value={drinkingDietary.alcoholFrequencyPerWeek || ""}
                    onChange={(value) =>
                      handleChange("alcoholFrequencyPerWeek", value)
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
                    한 번 마실 때 평균 몇 잔을 마십니까?
                  </Label>
                  <RadioGroup
                    name="alcoholQuantityPerSession"
                    options={[
                      { label: "1-2잔", value: "1_2_drinks" },
                      { label: "3-4잔", value: "3_4_drinks" },
                      { label: "5-6잔", value: "5_6_drinks" },
                      { label: "7잔 이상", value: "7_or_more_drinks" },
                    ]}
                    value={drinkingDietary.alcoholQuantityPerSession || ""}
                    onChange={(value) =>
                      handleChange("alcoholQuantityPerSession", value)
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
                    주로 마시는 술의 종류는 무엇입니까? (선호하는 순서대로)
                  </Label>
                  <RadioGroup
                    name="preferredAlcoholType"
                    options={[
                      { label: "소주", value: "soju" },
                      { label: "맥주", value: "beer" },
                      { label: "막걸리", value: "makgeolli" },
                      { label: "와인", value: "wine" },
                      { label: "위스키", value: "whiskey" },
                      { label: "기타", value: "other" },
                    ]}
                    value={drinkingDietary.preferredAlcoholType || ""}
                    onChange={(value) =>
                      handleChange("preferredAlcoholType", value)
                    }
                  />
                  {drinkingDietary.preferredAlcoholType === "other" && (
                    <div className="mt-2">
                      <Input
                        id="preferredAlcoholTypeOther"
                        name="preferredAlcoholTypeOther"
                        placeholder="기타 주류를 입력해 주세요"
                        value={drinkingDietary.preferredAlcoholTypeOther || ""}
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
                    술을 마신 후 구강건강에 변화를 느끼십니까?
                  </Label>
                  <RadioGroup
                    name="oralHealthChangesAfterDrinking"
                    options={[
                      { label: "매우 그렇다", value: "strongly_agree" },
                      { label: "그렇다", value: "agree" },
                      { label: "보통이다", value: "neutral" },
                      { label: "그렇지 않다", value: "disagree" },
                      { label: "전혀 그렇지 않다", value: "strongly_disagree" },
                    ]}
                    value={drinkingDietary.oralHealthChangesAfterDrinking || ""}
                    onChange={(value) =>
                      handleChange("oralHealthChangesAfterDrinking", value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <div className="bg-blue-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold mb-2 text-blue-800">카페인 섭취</h3>
      </div>

      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label className="font-medium">
                하루에 카페인 음료(커피, 차, 에너지 드링크 등)를 얼마나 자주
                마십니까?
              </Label>
              <RadioGroup
                name="caffeineFrequencyPerDay"
                options={[
                  { label: "마시지 않음", value: "none" },
                  { label: "1-2잔", value: "1_2_cups" },
                  { label: "3-4잔", value: "3_4_cups" },
                  { label: "5잔 이상", value: "5_or_more_cups" },
                ]}
                value={drinkingDietary.caffeineFrequencyPerDay || ""}
                onChange={(value) =>
                  handleChange("caffeineFrequencyPerDay", value)
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
                주로 마시는 카페인 음료는 무엇입니까?
              </Label>
              <RadioGroup
                name="preferredCaffeineDrink"
                options={[
                  { label: "아메리카노/블랙 커피", value: "americano" },
                  { label: "라떼/우유가 들어간 커피", value: "latte" },
                  { label: "에스프레소", value: "espresso" },
                  { label: "차(녹차, 홍차 등)", value: "tea" },
                  { label: "에너지 드링크", value: "energy_drink" },
                  { label: "콜라나 다른 탄산음료", value: "soda" },
                  { label: "기타", value: "other" },
                ]}
                value={drinkingDietary.preferredCaffeineDrink || ""}
                onChange={(value) =>
                  handleChange("preferredCaffeineDrink", value)
                }
              />
              {drinkingDietary.preferredCaffeineDrink === "other" && (
                <div className="mt-2">
                  <Input
                    id="preferredCaffeineDrinkOther"
                    name="preferredCaffeineDrinkOther"
                    placeholder="기타 카페인 음료를 입력해 주세요"
                    value={drinkingDietary.preferredCaffeineDrinkOther || ""}
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
                카페인 음료를 마신 후 구강건강에 변화를 느끼십니까?
              </Label>
              <RadioGroup
                name="oralHealthChangesAfterCaffeine"
                options={[
                  { label: "매우 그렇다", value: "strongly_agree" },
                  { label: "그렇다", value: "agree" },
                  { label: "보통이다", value: "neutral" },
                  { label: "그렇지 않다", value: "disagree" },
                  { label: "전혀 그렇지 않다", value: "strongly_disagree" },
                ]}
                value={drinkingDietary.oralHealthChangesAfterCaffeine || ""}
                onChange={(value) =>
                  handleChange("oralHealthChangesAfterCaffeine", value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrinkingDietaryStep;
