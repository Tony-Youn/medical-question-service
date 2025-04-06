import {
  YesNoAnswer,
  Gender,
  Nationality,
  EducationLevel,
  HouseholdComposition,
  InterestLevel,
  BrushingFrequency,
  DentalCheckupFrequency,
  BrushingDuration,
  ToothbrushReplacement,
  ScalingFrequency,
  HealthStatus,
  SmokingStatus,
  ExerciseFrequency,
  Frequency,
  StepStatus,
} from "./enums/questionnaire";

// Basic information section
export interface BasicInfoData {
  name: string;
  age: number | null;
  gender: Gender | null;
  nationality: Nationality | null;
  foreignCountry?: string;
  educationLevel: EducationLevel | null;
  householdComposition: HouseholdComposition | null;
  economicActivity: YesNoAnswer | null;
  dentalInsurance: YesNoAnswer | null;
  oralHealthInterest: InterestLevel | null;
}

// Allergies and health section
export interface AllergiesHealthData {
  drugAllergy: YesNoAnswer | null;
  drugAllergyDetails?: string;
  foodAllergy: YesNoAnswer | null;
  foodAllergyDetails?: string;
  bloodCirculationMedication: YesNoAnswer | null;
  bloodCirculationMedicationDetails?: string;
  healthSupplements: string[] | null;
  healthSupplementsOther?: string;
}

// Medical history section
export interface MedicalHistoryData {
  diseaseHistory: "current" | "past" | "none" | null;
  pastDiseaseDetails?: string;
  multipleCurrentDiseases: YesNoAnswer | null;
  singleDisease?: string;
  singleDiseaseDetails?: string;
  multipleDiseases?: string[];
  multipleDiseaseDetails?: string;
  injectionDialysisTreatment: YesNoAnswer | null;
}

// Oral health habits 1 section
export interface OralHealthHabits1Data {
  dentalCheckupFrequency: DentalCheckupFrequency | null;
  brushingFrequency: BrushingFrequency | null;
  nightBrushingFrequency: Frequency | null;
  brushingDuration: BrushingDuration | null;
  toothbrushReplacement: ToothbrushReplacement | null;
  scalingFrequency: ScalingFrequency | null;
  oralHealthSelfAssessment: HealthStatus | null;
}

// Oral health habits 2 section
export interface OralHealthHabits2Data {
  teethGrindingHabit: YesNoAnswer | null;
  oralHealthProducts: string[] | null;
  oralHealthProductsOther?: string;
  interdentalsFrequency: Frequency | null;
  dentureUsage: YesNoAnswer | null;
  dentureCleaningFrequency?: Frequency | null;
}

// Oral dryness and function 1 section
export interface OralDrynessFunction1Data {
  dryMouthDuringMeals: YesNoAnswer | null;
  needDrinkWithDryFood: YesNoAnswer | null;
  swallowingDifficulty: YesNoAnswer | null;
  usesCandyGumForDryness: YesNoAnswer | null;
  difficultyEatingAlone: YesNoAnswer | null;
  brushingDifficultyDueToWeakness: YesNoAnswer | null;
  eatingDifficultyDueToToothLoss: YesNoAnswer | null;
}

// Oral function 2 section
export interface OralFunction2Data {
  difficultyChewingToughFoods: YesNoAnswer | null;
  difficultyChewingMediumFoods: YesNoAnswer | null;
  difficultyChewingSoftFoods: YesNoAnswer | null;
  swallowingDifficulty2Weeks: YesNoAnswer | null;
  foodResidue?: YesNoAnswer | null;
  frequentCoughing?: YesNoAnswer | null;
  voiceChangeAfterEating: YesNoAnswer | null;
  foodSpillage: YesNoAnswer | null;
  longerMealTime: YesNoAnswer | null;
  speechDifficulties: YesNoAnswer | null;
  chewingSide: string | null;
  hardFoodDifficulty: string | null;
  swallowBeforeChewing: string | null;
  jawSoundWhenChewing: string | null;
  chokingOnLiquids: string | null;
  foodStuckInThroat: string | null;
  painWhenSwallowing: string | null;
  residualFeelingAfterSwallowing: string | null;
  swallowingAbilityChange: string | null;
}

// Smoking habits section
export interface SmokingHabitsData {
  secondhandSmokeExposure: YesNoAnswer | null;
  smokedMoreThan100: YesNoAnswer | null;
  smokingStatus: SmokingStatus | null;
  tastiesCigaretteTiming?: string;
  tastiesCigaretteTimingOther?: string;
  smokesWhenSick?: YesNoAnswer | null;
  timeToFirstCigarette?: string;
  difficultyAbstainingInRestrictedAreas?: YesNoAnswer | null;
  quitIntention?: YesNoAnswer | null;
  regularCigaretteStatus?: "current" | "past" | "never" | null;
  regularCigarettesPerDay?: string;
  regularCigarettesCount?: number | null;
  regularCigaretteDuration?: string;
  electronicCigaretteUsage?: YesNoAnswer | null;
  electronicCigaretteType?: string;
  electronicCigaretteTypeOther?: string;
  electronicCigaretteAmount?: string;
  electronicCigaretteDuration?: string;
  totalSmokingDuration?: string;
  totalQuittingDuration?: string;
  smokingStartAge: string | null;
  cigarettesPerDay: string | null;
  smokingType: string | null;
  smokingTypeOther: string | null;
  quitAttempts: string | null;
  quitDuration: string | null;
  cigarettesPerDayBeforeQuitting: string | null;
  quitReason: string | null;
  quitReasonOther: string | null;
  awarenessOfOralHealthImpact: string | null;
}

// Drinking and dietary habits section
export interface DrinkingDietaryHabitsData {
  drinkingFrequency: string | null;
  gender?: Gender | null;
  alcoholTypes?: string[];
  sojuWeeklyAmount?: string | null;
  beerWeeklyAmount?: string | null;
  wineWeeklyAmount?: string | null;
  drinksMixedAlcohol?: YesNoAnswer | null;
  alcoholBlackouts?: YesNoAnswer | null;
  dailyDairyConsumption: Frequency | null;
  dailyProteinConsumption: Frequency | null;
  vegetablesEveryMeal: Frequency | null;
  dailyFruitConsumption: Frequency | null;
  friedFoodFrequency: Frequency | null;
}

// Dietary habits and physical activity section
export interface DietaryPhysicalActivityData {
  highCholesterolFoodFrequency: Frequency | null;
  dailyFoodGroups: string | null;
  sugarConsumptionFrequency: string | null;
  saltyFoodConsumption: Frequency | null;
  waterConsumption: Frequency | null;
  toughFoodConsumption: Frequency | null;
  mealDiscomfortDueToOralIssues: Frequency | null;
  eatingAloneFrequency: Frequency | null;
  economicSituationForFood: string | null;
  height: number | null;
  weight: number | null;
  weeklyHighIntensityExercise: ExerciseFrequency | null;
  weeklyModerateExercise: ExerciseFrequency | null;
  weeklyStrengthTraining: string | null;
}

// Mental health section
export interface MentalHealthData {
  problemSolvingConfidence: Frequency | null;
  irritabilityManagement: Frequency | null;
  feelingOverwhelmed: Frequency | null;
  majorLifeChanges: YesNoAnswer | null;
  interestLoss: string | null;
  fatigue: string | null;
  appetiteChange: string | null;
  sleepDuration: string | null;
  difficultyFallingAsleep: Frequency | null;
  sleepImpactOnFunction: string | null;
  feelingDown: string | null;
  lackOfInterest: string | null;
  sleepIssues: string | null;
  appetiteChanges: string | null;
  negativeFeelingsAboutSelf: string | null;
  concentrationIssues: string | null;
  psychomotorChanges: string | null;
  suicidalThoughts: string | null;
  seekedMentalHealthHelp: string | null;
  additionalMentalHealthInfo: string | null;
}

// Sleep patterns and oral health knowledge section
export interface SleepOralKnowledgeData {
  sleepSatisfaction: string | null;
  sleepDissatisfactionReason?: string;
  sleepDissatisfactionReasonOther?: string;
  snoringFrequency: YesNoAnswer | null;
  dryMouthUponWaking: YesNoAnswer | null;
  breathingDifficultyDuringSleep: YesNoAnswer | null;
  teethGrinding: YesNoAnswer | null;
  chronicFatigue: YesNoAnswer | null;
  headachesUponWaking: YesNoAnswer | null;
  dentalCariesCause: string | null;
  dentalCariesPrevention: string | null;
  fluorideToothpaste: string | null;
}

// Oral health knowledge and dental anxiety section
export interface OralKnowledgeAnxietyData {
  periodontitisUnderstanding: string | null;
  smokingPeriodontalCorrelation: string | null;
  implantDentureMaintenanceKnowledge: YesNoAnswer | null;
  dentalInsuranceAwareness: YesNoAnswer | null;
  tomorrowDentalVisitFeeling: string | null;
  waitingRoomFeeling: string | null;
  cavityTreatmentFeeling: string | null;
  scalingFeeling: string | null;
}

// Completion section
export interface CompletionData {
  contactInformation: string;
}

// New interface for Drinking Dietary
export interface DrinkingDietaryData {
  alcoholConsumption: string | null;
  alcoholFrequencyPerWeek: string | null;
  alcoholQuantityPerSession: string | null;
  preferredAlcoholType: string | null;
  preferredAlcoholTypeOther: string | null;
  oralHealthChangesAfterDrinking: string | null;
  caffeineFrequencyPerDay: string | null;
  preferredCaffeineDrink: string | null;
  preferredCaffeineDrinkOther: string | null;
  oralHealthChangesAfterCaffeine: string | null;
}

// New interface for Dietary Physical
export interface DietaryPhysicalData {
  mealsPerDay: string | null;
  snacksPerDay: string | null;
  mealsAtRegularTimes: string | null;
  chewingThoroughly: string | null;
  sweetFoodConsumption: string | null;
  sodaConsumption: string | null;
  oralHygieneAfterSugaryFood: string | null;
  exerciseFrequency: string | null;
  exerciseDuration: string | null;
  exerciseTypes: string[] | null;
  exerciseTypesOther: string | null;
  sittingHoursPerDay: string | null;
  additionalDietaryInfo: string | null;
}

// New interface for Oral Dryness Function
export interface OralDrynessFunctionData {
  feelsDryness: string | null;
  drynessWhenEating: string | null;
  needLiquidToSwallow: string | null;
  thirstAtNight: string | null;
  useCandyForDryness: string | null;
  foodSticksInMouth: string | null;
  badBreathConcern: string | null;
  othersMentionedBadBreath: string | null;
  badBreathPrevention: string | null;
}

// Combined questionnaire data
export interface QuestionnaireData {
  id?: string;
  basicInfo: BasicInfoData;
  allergiesHealth: AllergiesHealthData;
  medicalHistory: MedicalHistoryData;
  oralHealthHabits1: OralHealthHabits1Data;
  oralHealthHabits2: OralHealthHabits2Data;
  oralDrynessFunction1: OralDrynessFunction1Data;
  oralFunction2: OralFunction2Data;
  smokingHabits: SmokingHabitsData;
  drinkingDietaryHabits: DrinkingDietaryHabitsData;
  dietaryPhysicalActivity: DietaryPhysicalActivityData;
  mentalHealth: MentalHealthData;
  sleepOralKnowledge: SleepOralKnowledgeData;
  oralKnowledgeAnxiety: OralKnowledgeAnxietyData;
  completion: CompletionData;
  drinkingDietary: DrinkingDietaryData;
  dietaryPhysical: DietaryPhysicalData;
  oralDrynessFunction: OralDrynessFunctionData;
  createdAt?: Date;
  updatedAt?: Date;
  isCompleted?: boolean;
  currentStep?: number;
  steps?: Record<number, StepStatus>;
}

// Form step type
export interface FormStep {
  id: number;
  title: string;
  status: StepStatus;
}

// Progress tracking type
export interface Progress {
  currentStep: number;
  totalSteps: number;
  steps: FormStep[];
  percentComplete: number;
}

// Questionnaire database types
export interface QuestionnaireSection {
  id: string;
  title: string;
  description: string | null;
  order_index: number;
  is_active: boolean;
}

export interface QuestionnaireQuestion {
  id: string;
  section_id: string;
  question_text: string;
  question_type: string;
  description?: string;
  is_required: boolean;
  order_index: number;
  parent_question_id: string | null;
  parent_response_value: string | null;
  options: QuestionOption[] | null;
}

export interface QuestionOption {
  label: string;
  value: string;
}

export interface QuestionnaireResponse {
  id?: string;
  submission_id: string;
  question_id: string;
  response_value?: string;
  response_text?: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuestionnaireSubmission {
  id?: string;
  profile_id: string;
  completed: boolean;
  submitted_at?: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
}
