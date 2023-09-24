import { Meal } from "./Meal"

export type User = {
  activityLevel: number;
  dateBirth: string;
  username: string;
  gender: number;
  height: number;
  objective: number;
  weight: number;
  startWeight :number;
  imageLink : string;
  weightObj: number;
  zipcode: number;
  foodConsumed ?: Meal[];
  workouts?: any;
};

export const defaultUser: User = {
  activityLevel: 0,
  dateBirth: new Date().toString(),
  username: "",
  gender: 0,
  height: 0,
  objective: 1,
  weight: 0,
  startWeight :0,
  imageLink : "",
  weightObj: 0,
  zipcode: 0,
  foodConsumed :[],
  workouts: [],
};


