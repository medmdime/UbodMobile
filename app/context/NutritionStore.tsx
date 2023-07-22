import React, {createContext, useContext, useState} from 'react';
import { defaultMeal, Meal, MealType, NutritionContextType } from "./types"

const NutritionContext = createContext<NutritionContextType>({} as NutritionContextType);

const NutritionProvider = ({children}) => {
  const [breakfast, setBreakfast] = useState<Meal[]>([]);
  const [lunch, setLunch] = useState<Meal[]>([]);
  const [dinner, setDinner] = useState<Meal[]>([]);
  const [snack, setSnack] = useState<Meal[]>([]);
  const [lastSeenProduct, setLastSeenProduct] = useState<Meal>(defaultMeal);
  const [lastMeal, setLastMeal] = useState<MealType>(MealType.Breakfast);

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
