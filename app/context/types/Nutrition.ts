import { Meal } from "./Meal"
import { User } from "./User"

export interface NutritionContextType {
  lunch: Meal[];
  setLunch: (object: Meal[]) => void;
  dinner: Meal[];
  setDinner: (object: Meal[]) => void;
  breakfast: Meal[];
  setBreakfast: (object: Meal[]) => void;
  snack: Meal[];
  setSnack: (object: Meal[]) => void;
  lastMeal: MealType;
  setLastMeal: (object: MealType) => void;
  lastSeenProduct: Meal;
  setLastSeenProduct: (object: Meal) => void;
}
export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack',

}

export interface UserNutritionData extends NutritionContextType{
  user: User
  targetCalories: number;
  foodCalories: number;
  protein: number;
  proteinConsumed: number;
  carbs: number;
  carbsConsumed: number;
  fat: number;
  fatConsumed: number;
  fiber: number;
  fiberConsumed: number;
  sugar: number;
  sugarConsumed: number;
  AcideGrasSatures: number;
  AcideGrasSaturesConsumed: number;
  Sodium: number;
  SodiumConsumed: number;
  caloriesLunch: number;
  caloriesDinner: number;
  caloriesBreakfast: number;
  caloriesSnack: number;
}

export interface UserNutritionContextData extends UserNutritionData {
  setUserData: (data: Partial<UserNutritionData>) => void;


}