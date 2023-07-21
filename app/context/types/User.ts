import { Meal } from "./Meal"

export type User = {
  activityLevel: number;
  address: string;
  dateBirth: string;
  username: string;
  email: string;
  gender: number;
  height: number;
  objective: number;
  weight: number;
  startWeight :number;
  weeklyObjective : number;
  imageLink : string;
  weight_obj: number;
  zipcode: number;
  FoodConsumed ?: Meal[];
  Workouts?: any;
};