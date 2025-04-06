import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuestionnaireData, FormStep } from "../types";
import { QuestionnaireStep, StepStatus } from "../enums/questionnaire";
import { getCurrentKSTDate } from "../timezone";

// Initialize empty questionnaire data
const initialQuestionnaireData: QuestionnaireData = {
  basicInfo: {
    name: "",
    age: null,
    gender: null,
    nationality: null,
    educationLevel: null,
    householdComposition: null,
    economicActivity: null,
    dentalInsurance: null,
    oralHealthInterest: null,
  },
  allergiesHealth: {
    drugAllergy: null,
    foodAllergy: null,
    bloodCirculationMedication: null,
    healthSupplements: null,
  },
  medicalHistory: {
    diseaseHistory: null,
    multipleCurrentDiseases: null,
    injectionDialysisTreatment: null,
  },
  oralHealthHabits1: {
    dentalCheckupFrequency: null,
    brushingFrequency: null,
    nightBrushingFrequency: null,
    brushingDuration: null,
    toothbrushReplacement: null,
    scalingFrequency: null,
    oralHealthSelfAssessment: null,
  },
  oralHealthHabits2: {
    teethGrindingHabit: null,
    oralHealthProducts: null,
    interdentalsFrequency: null,
    dentureUsage: null,
  },
  oralDrynessFunction1: {
    dryMouthDuringMeals: null,
    needDrinkWithDryFood: null,
    swallowingDifficulty: null,
    usesCandyGumForDryness: null,
    difficultyEatingAlone: null,
    brushingDifficultyDueToWeakness: null,
    eatingDifficultyDueToToothLoss: null,
  },
  oralFunction2: {
    difficultyChewingToughFoods: null,
    difficultyChewingMediumFoods: null,
    difficultyChewingSoftFoods: null,
    swallowingDifficulty2Weeks: null,
    voiceChangeAfterEating: null,
    foodSpillage: null,
    longerMealTime: null,
    speechDifficulties: null,
    chewingSide: null,
    hardFoodDifficulty: null,
    swallowBeforeChewing: null,
    jawSoundWhenChewing: null,
    chokingOnLiquids: null,
    foodStuckInThroat: null,
    painWhenSwallowing: null,
    residualFeelingAfterSwallowing: null,
    swallowingAbilityChange: null,
  },
  smokingHabits: {
    secondhandSmokeExposure: null,
    smokedMoreThan100: null,
    smokingStatus: null,
    smokingStartAge: null,
    cigarettesPerDay: null,
    smokingType: null,
    smokingTypeOther: null,
    quitAttempts: null,
    quitDuration: null,
    cigarettesPerDayBeforeQuitting: null,
    quitReason: null,
    quitReasonOther: null,
    awarenessOfOralHealthImpact: null,
  },
  drinkingDietaryHabits: {
    drinkingFrequency: null,
    dailyDairyConsumption: null,
    dailyProteinConsumption: null,
    vegetablesEveryMeal: null,
    dailyFruitConsumption: null,
    friedFoodFrequency: null,
  },
  dietaryPhysicalActivity: {
    highCholesterolFoodFrequency: null,
    dailyFoodGroups: null,
    sugarConsumptionFrequency: null,
    saltyFoodConsumption: null,
    waterConsumption: null,
    toughFoodConsumption: null,
    mealDiscomfortDueToOralIssues: null,
    eatingAloneFrequency: null,
    economicSituationForFood: null,
    height: null,
    weight: null,
    weeklyHighIntensityExercise: null,
    weeklyModerateExercise: null,
    weeklyStrengthTraining: null,
  },
  mentalHealth: {
    problemSolvingConfidence: null,
    irritabilityManagement: null,
    feelingOverwhelmed: null,
    majorLifeChanges: null,
    interestLoss: null,
    fatigue: null,
    appetiteChange: null,
    sleepDuration: null,
    difficultyFallingAsleep: null,
    sleepImpactOnFunction: null,
    feelingDown: null,
    lackOfInterest: null,
    sleepIssues: null,
    appetiteChanges: null,
    negativeFeelingsAboutSelf: null,
    concentrationIssues: null,
    psychomotorChanges: null,
    suicidalThoughts: null,
    seekedMentalHealthHelp: null,
    additionalMentalHealthInfo: null,
  },
  sleepOralKnowledge: {
    sleepSatisfaction: null,
    snoringFrequency: null,
    dryMouthUponWaking: null,
    breathingDifficultyDuringSleep: null,
    teethGrinding: null,
    chronicFatigue: null,
    headachesUponWaking: null,
    dentalCariesCause: null,
    dentalCariesPrevention: null,
    fluorideToothpaste: null,
  },
  oralKnowledgeAnxiety: {
    periodontitisUnderstanding: null,
    smokingPeriodontalCorrelation: null,
    implantDentureMaintenanceKnowledge: null,
    dentalInsuranceAwareness: null,
    tomorrowDentalVisitFeeling: null,
    waitingRoomFeeling: null,
    cavityTreatmentFeeling: null,
    scalingFeeling: null,
  },
  completion: {
    contactInformation: "",
  },
  drinkingDietary: {
    alcoholConsumption: null,
    alcoholFrequencyPerWeek: null,
    alcoholQuantityPerSession: null,
    preferredAlcoholType: null,
    preferredAlcoholTypeOther: null,
    oralHealthChangesAfterDrinking: null,
    caffeineFrequencyPerDay: null,
    preferredCaffeineDrink: null,
    preferredCaffeineDrinkOther: null,
    oralHealthChangesAfterCaffeine: null,
  },
  dietaryPhysical: {
    mealsPerDay: null,
    snacksPerDay: null,
    mealsAtRegularTimes: null,
    chewingThoroughly: null,
    sweetFoodConsumption: null,
    sodaConsumption: null,
    oralHygieneAfterSugaryFood: null,
    exerciseFrequency: null,
    exerciseDuration: null,
    exerciseTypes: null,
    exerciseTypesOther: null,
    sittingHoursPerDay: null,
    additionalDietaryInfo: null,
  },
  oralDrynessFunction: {
    feelsDryness: null,
    drynessWhenEating: null,
    needLiquidToSwallow: null,
    thirstAtNight: null,
    useCandyForDryness: null,
    foodSticksInMouth: null,
    badBreathConcern: null,
    othersMentionedBadBreath: null,
    badBreathPrevention: null,
  },
  createdAt: getCurrentKSTDate(),
  updatedAt: getCurrentKSTDate(),
  isCompleted: false,
  currentStep: QuestionnaireStep.INTRODUCTION,
  steps: {
    [QuestionnaireStep.INTRODUCTION]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.BASIC_INFO]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.ALLERGIES_HEALTH]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.MEDICAL_HISTORY]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.ORAL_HEALTH_HABITS_1]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.ORAL_HEALTH_HABITS_2]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.ORAL_DRYNESS_FUNCTION_1]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.ORAL_FUNCTION_2]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.SMOKING_HABITS]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.DRINKING_DIETARY_HABITS]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.DIETARY_PHYSICAL_ACTIVITY]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.MENTAL_HEALTH]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.SLEEP_ORAL_KNOWLEDGE]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.ORAL_KNOWLEDGE_ANXIETY]: StepStatus.NOT_STARTED,
    [QuestionnaireStep.COMPLETION]: StepStatus.NOT_STARTED,
  },
};

// Define steps with titles
export const formSteps: FormStep[] = [
  {
    id: QuestionnaireStep.INTRODUCTION,
    title: "치과 문진표를 시작합니다",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.BASIC_INFO,
    title: "기본 정보를 입력해 주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.ALLERGIES_HEALTH,
    title: "알레르기 및 건강 정보를 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.MEDICAL_HISTORY,
    title: "질환 이력을 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.ORAL_HEALTH_HABITS_1,
    title: "구강건강 관리 습관에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.ORAL_HEALTH_HABITS_2,
    title: "구강용품 사용 습관에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.ORAL_DRYNESS_FUNCTION_1,
    title: "구강 건조 및 기능에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.ORAL_FUNCTION_2,
    title: "음식 씹기와 삼키기에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.SMOKING_HABITS,
    title: "흡연 습관에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.DRINKING_DIETARY_HABITS,
    title: "음주 및 식습관에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.DIETARY_PHYSICAL_ACTIVITY,
    title: "식습관 및 신체 활동에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.MENTAL_HEALTH,
    title: "정신 건강에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.SLEEP_ORAL_KNOWLEDGE,
    title: "수면 패턴과 구강건강 지식에 대해 알려주세요",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.ORAL_KNOWLEDGE_ANXIETY,
    title: "구강건강 지식과 치과 방문에 대한 느낌",
    status: StepStatus.NOT_STARTED,
  },
  {
    id: QuestionnaireStep.COMPLETION,
    title: "문진표 작성을 완료합니다",
    status: StepStatus.NOT_STARTED,
  },
];

// Calculate estimated remaining time based on completed steps
export const calculateEstimatedTime = (
  currentStep: number,
  totalSteps: number
): number => {
  const remainingSteps = totalSteps - currentStep;
  // Assume average time of 2 minutes per step
  return remainingSteps * 2;
};

interface QuestionnaireStore {
  // State
  data: QuestionnaireData;
  currentStep: number;
  isSubmitting: boolean;
  isSubmitted: boolean;

  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateStep: (step: number, status: StepStatus) => void;
  updateResponse: <K extends keyof QuestionnaireData>(
    section: K,
    field: keyof QuestionnaireData[K],
    value: any
  ) => void;
  resetQuestionnaire: () => void;
  submitQuestionnaire: () => Promise<boolean>;
}

export const useQuestionnaireStore = create<QuestionnaireStore>()(
  persist(
    (set, get) => ({
      data: initialQuestionnaireData,
      currentStep: QuestionnaireStep.INTRODUCTION,
      isSubmitting: false,
      isSubmitted: false,

      setCurrentStep: (step) => {
        set({ currentStep: step });
        // Update step status to in_progress if not already completed
        const { data } = get();
        if (data.steps && data.steps[step] !== StepStatus.COMPLETED) {
          get().updateStep(step, StepStatus.IN_PROGRESS);
        }
      },

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < QuestionnaireStep.COMPLETION) {
          // Mark current step as completed
          get().updateStep(currentStep, StepStatus.COMPLETED);
          // Move to next step and mark it as in progress
          const nextStep = currentStep + 1;
          set({ currentStep: nextStep });
          get().updateStep(nextStep, StepStatus.IN_PROGRESS);
        }
      },

      previousStep: () => {
        const { currentStep } = get();
        if (currentStep > QuestionnaireStep.INTRODUCTION) {
          set({ currentStep: currentStep - 1 });
        }
      },

      updateStep: (step, status) => {
        set((state) => ({
          data: {
            ...state.data,
            steps: {
              ...state.data.steps,
              [step]: status,
            },
            updatedAt: getCurrentKSTDate(),
          },
        }));
      },

      updateResponse: <K extends keyof QuestionnaireData>(
        section: K,
        field: keyof QuestionnaireData[K],
        value: any
      ) => {
        set((state) => {
          // Create a deep copy of the current state
          const newData = JSON.parse(
            JSON.stringify(state.data)
          ) as QuestionnaireData;

          // Update the specific field
          if (newData[section] && typeof newData[section] === "object") {
            (newData[section] as any)[field] = value;
          }

          // Update the timestamp
          newData.updatedAt = getCurrentKSTDate();

          // Return updated state
          return { data: newData };
        });
      },

      resetQuestionnaire: () => {
        set({
          data: initialQuestionnaireData,
          currentStep: QuestionnaireStep.INTRODUCTION,
          isSubmitting: false,
          isSubmitted: false,
        });
      },

      submitQuestionnaire: async () => {
        set({ isSubmitting: true });
        try {
          // Use fetch to submit the data to our API route
          const response = await fetch("/api/questionnaire", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(get().data),
          });

          const result = await response.json();

          if (result.success) {
            set((state) => ({
              data: {
                ...state.data,
                isCompleted: true,
                steps: {
                  ...state.data.steps,
                  [QuestionnaireStep.COMPLETION]: StepStatus.COMPLETED,
                },
              },
              isSubmitting: false,
              isSubmitted: true,
            }));
            return true;
          } else {
            console.error("Error submitting questionnaire:", result.error);
            set({ isSubmitting: false });
            return false;
          }
        } catch (error) {
          console.error("Error submitting questionnaire:", error);
          set({ isSubmitting: false });
          return false;
        }
      },
    }),
    {
      name: "dental-questionnaire-storage",
      // Only store data and step information, not UI state
      partialize: (state) => ({
        data: state.data,
        currentStep: state.currentStep,
        isSubmitted: state.isSubmitted,
      }),
    }
  )
);

export interface CompletionData {
  contactInformation: string;
}
