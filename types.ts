export interface Meal {
  name: string;
  ingredients: string[];
  instructions: string;
}

export interface DailyPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal;
}

export type DietPlan = DailyPlan[];

export interface UserInput {
  condition: string;
  age: number | ''; // Allow empty string for initial form state
  comorbidity: string;
  preferences: string[];
  allergies: string;
  goals: string;
  duration: PlanDuration;
  language: Language;
}

export const DIETARY_PREFERENCES = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Paleo",
    "Low-FODMAP",
] as const;

export type DietaryPreference = typeof DIETARY_PREFERENCES[number];

export const PLAN_DURATIONS = ["7-Day", "1-Month"] as const;
export type PlanDuration = typeof PLAN_DURATIONS[number];

export const LANGUAGES = ["English", "Marathi", "Hindi"] as const;
export type Language = typeof LANGUAGES[number];