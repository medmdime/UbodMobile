import React, {createContext, useContext, useState} from 'react';
import { Meal } from "./types"


type NutritionContextType = {
  breakfast: Meal[];
  setBreakfast: React.Dispatch<React.SetStateAction<Meal[]>>;
  lunch: Meal[];
  setLunch: React.Dispatch<React.SetStateAction<Meal[]>>;
  dinner: Meal[];
  setDinner: React.Dispatch<React.SetStateAction<Meal[]>>;
  snack: Meal[];
  setSnack: React.Dispatch<React.SetStateAction<Meal[]>>;
  lastSeenProduct: Meal[];
  setLastSeenProduct: React.Dispatch<React.SetStateAction<Meal[]>>;
  lastMeal: Meal;
  setLastMeal: React.Dispatch<React.SetStateAction<Meal>>;
}
const NutritionContext = createContext<NutritionContextType>({} as NutritionContextType);

const NutritionProvider = ({children}) => {
  const [breakfast, setBreakfast] = useState<Meal[]>([]);
  const [lunch, setLunch] = useState<Meal[]>([]);
  const [dinner, setDinner] = useState<Meal[]>([]);
  const [snack, setSnack] = useState<Meal[]>([]);
  const [lastSeenProduct, setLastSeenProduct] = useState<Meal[]>([]);
  const [lastMeal, setLastMeal] = useState<Meal>({} as Meal);

  return (
    <NutritionContext.Provider
      value={{
        breakfast,
        setBreakfast,
        lunch,
        setLunch,
        dinner,
        setDinner,
        lastSeenProduct,
        setLastSeenProduct,
        snack,
        setSnack,
        lastMeal,
        setLastMeal,
      }}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => useContext(NutritionContext);

export { NutritionProvider };
