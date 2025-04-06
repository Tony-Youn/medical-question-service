// General answer options
export enum YesNoAnswer {
  YES = "yes",
  NO = "no",
}

// Gender options
export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

// Nationality options
export enum Nationality {
  KOREAN = "korean",
  FOREIGNER = "foreigner",
}

// Education level options
export enum EducationLevel {
  MIDDLE_SCHOOL = "middle_school_or_below",
  HIGH_SCHOOL = "high_school",
  COLLEGE = "college_or_above",
}

// Household composition
export enum HouseholdComposition {
  SINGLE = "single",
  MULTIPLE = "multiple",
}

// Interest level options
export enum InterestLevel {
  VERY_HIGH = "very_high",
  HIGH = "high",
  MODERATE = "moderate",
  LOW = "low",
  VERY_LOW = "very_low",
}

// Frequency options
export enum Frequency {
  ALWAYS = "always",
  OFTEN = "often",
  SOMETIMES = "sometimes",
  RARELY = "rarely",
  NEVER = "never",
}

// Brushing frequency options
export enum BrushingFrequency {
  ONCE = "once",
  TWICE = "twice",
  THREE_OR_MORE = "three_or_more",
}

// Smoking status options
export enum SmokingStatus {
  CURRENT = "current",
  FORMER = "former",
  NEVER = "never",
}

// Physical activity frequency options
export enum ExerciseFrequency {
  NONE = "none",
  ONE_TO_TWO = "one_to_two",
  THREE_TO_FOUR = "three_to_four",
  FIVE_OR_MORE = "five_or_more",
}

// Form step status
export enum StepStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ERROR = "error",
}

// Dental checkup frequency
export enum DentalCheckupFrequency {
  SIX_MONTHS = "six_months",
  ONE_YEAR = "one_year",
  ONE_TO_TWO_YEARS = "one_to_two_years",
  RARELY = "rarely",
}

// Brushing duration
export enum BrushingDuration {
  UNDER_ONE_MINUTE = "under_one_minute",
  UNDER_TWO_MINUTES = "under_two_minutes",
  UNDER_THREE_MINUTES = "under_three_minutes",
  OVER_THREE_MINUTES = "over_three_minutes",
}

// Toothbrush replacement frequency
export enum ToothbrushReplacement {
  ONE_MONTH = "one_month",
  THREE_MONTHS = "three_months",
  SIX_MONTHS = "six_months",
  ONE_YEAR = "one_year",
}

// Scaling frequency
export enum ScalingFrequency {
  THREE_TO_SIX_MONTHS = "three_to_six_months",
  ONE_YEAR = "one_year",
  TWO_YEARS = "two_years",
  THREE_TO_FIVE_YEARS = "three_to_five_years",
  RARELY = "rarely",
}

// Health status
export enum HealthStatus {
  VERY_GOOD = "very_good",
  GOOD = "good",
  AVERAGE = "average",
  BAD = "bad",
  VERY_BAD = "very_bad",
}

// Questionnaire steps
export enum QuestionnaireStep {
  INTRODUCTION = 1,
  BASIC_INFO = 2,
  ALLERGIES_HEALTH = 3,
  MEDICAL_HISTORY = 4,
  ORAL_HEALTH_HABITS_1 = 5,
  ORAL_HEALTH_HABITS_2 = 6,
  ORAL_DRYNESS_FUNCTION_1 = 7,
  ORAL_FUNCTION_2 = 8,
  SMOKING_HABITS = 9,
  DRINKING_DIETARY_HABITS = 10,
  DIETARY_PHYSICAL_ACTIVITY = 11,
  MENTAL_HEALTH = 12,
  SLEEP_ORAL_KNOWLEDGE = 13,
  ORAL_KNOWLEDGE_ANXIETY = 14,
  COMPLETION = 15,
}
