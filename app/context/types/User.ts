import { Meal } from "./Meal"

export type User = {
  activity_level: number;
  address: string;
  date_birth: string;
  username: string;
  email: string;
  gender: number;
  height: number;
  objective: number;
  weight: number;
  start_weight :number;
  imageLink : string;
  weight_obj: number;
  zipcode: number;
  foodConsumed ?: Meal[];
  workouts?: any;
};

export const defaultUser: User = {
  activity_level: 0,
  address: "",
  date_birth: new Date().toString(),
  username: "",
  email: "",
  gender: 0,
  height: 0,
  objective: 1,
  weight: 0,
  start_weight :0,
  imageLink : "",
  weight_obj: 0,
  zipcode: 0,
  foodConsumed :[],
  workouts: [],
};


