import { Meal, User } from "./types"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useLogin } from "./LoginProvider"
import { useNutrition } from "./NutritionStore"

interface UserNutritionData {
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

  Lunch: Meal[];
  caloriesLunch: number;
  setLunch: (object: Meal[]) => void;
  Dinner: Meal[];
  caloriesDinner: number;
  setDinner: (object: Meal[]) => void;
  Breakfast: Meal[];
  caloriesBreakfast: number;
  setBreakfast: (object: Meal[]) => void;
  Snack: Meal[];
  caloriesSnack: number;
  setSnack: (object: Meal[]) => void;
  lastMeal: Meal[];
  setLastMeal: (object: Meal) => void;
  lastSeenProduct: Meal;
  setLastSeenProduct: (object: Meal) => void;
}

interface MealNutrients {
  nutrimentPortion: {
    "energy-kcal"?: number;
    "carbohydrates_100g"?: number;
    "proteins_100g"?: number;
    "fat_100g"?: number;
    "fiber_100g"?: number;
    "sodium_100g"?: number;
    "sugars_100g"?: number;
    "saturated-fat_100g"?: number;
  };
}
interface UserNutritionContextData extends UserNutritionData {
  setUserData: (data: Partial<UserNutritionData>) => void;
}

const UserNutritionContext = createContext<UserNutritionContextData>({} as UserNutritionContextData)


interface UserNutritionProviderProps {
  children: ReactNode;
}


const UserNutritionProvider: React.FC<UserNutritionProviderProps> = ({ children }) => {

  const DataLoginUser = useLogin()
  const {
    lastMeal,
    setLastMeal,
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
  } = useNutrition()
  const { gender, height, weight, objective, activityLevel, dateBirth } =
    DataLoginUser.user;

  const [targetCaloriesIntake, setTargetCaloriesIntake] = useState(0)
  const [foodCalories, setFoodCalories] = useState(0)
  const [activityFactor, setActivityFactor] = useState(getActivityFactor(DataLoginUser.user.activityLevel))
  const [userData, setUserDataState] = useState<UserNutritionData>({} as UserNutritionData)


  const setUserData = (data: Partial<UserNutritionData>) => {
    setUserDataState((prevState) => ({ ...prevState, ...data }))
  }
  function getActivityFactor(activityLevel: number) {
    switch (activityLevel) {
      case 1:
        return 1.375
      case 2:
        return 1.55
      case 3:
        return 1.725
      case 4:
        return 1.9
      default:
        return 1.2
    }
  }
  const calculateCalories = (meals: MealNutrients[] = []) => meals.reduce((acc, meal) => acc + (meal.nutrimentPortion["energy-kcal"] || 0), 0)
  const calculateNutrients = (meals: MealNutrients[] , nutrientName: string) => meals.reduce((acc, meal) => acc + (meal.nutrimentPortion[nutrientName] || 0), 0)
  const calculateMacronutrients = (): void => {
    // Calculate protein, carbs, and fat based on the user's gender and goal
    const isMale = gender === 1;

    const proteinPercentage = 30;
    const carbsPercentage = isMale ? 40 : 45;
    const fatPercentage = isMale ? 30 : 25;

    const totalProtein = (targetCaloriesIntake * proteinPercentage) / 100 / 4 // 4 calories per gram of protein
    const totalCarbs = (targetCaloriesIntake * carbsPercentage) / 100 / 4 // 4 calories per gram of carbohydrate
    const totalFat = (targetCaloriesIntake * fatPercentage) / 100 / 9 // 9 calories per gram of fat

    setUserData({
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fat: Math.round(totalFat),
    })
  }
  const calculateMicronutrients = (): void => {
    // Recommended daily values for micronutrients
    const fiber = gender === 1 ? 38 : 25 // Male: 38g, Female: 25g
    const sugar = 50 // Limit added sugar to 50g per day
    const AcideGrasSatures = Math.round((targetCaloriesIntake * 0.1) / 9) // 10% of daily calories
    const Sodium = 2300 // Limit sodium to 2300mg per day
    setUserData({
      fiber,
      sugar,
      AcideGrasSatures,
      Sodium,
    })
  }
  const targetCalories = () => {
    const age = new Date().getFullYear() - new Date(dateBirth).getFullYear()


    setActivityFactor(getActivityFactor(activityLevel))
    const isMale = DataLoginUser.user.gender === 1;

    const calculatedBmr = isMale
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age

    const calculatedTdee = calculatedBmr * activityFactor

    let targetCaloriePercentage = 100
    if (objective === 1) { // Lose weight
      targetCaloriePercentage = 80
    }

    const calculatedTargetCalories =
      (calculatedTdee * targetCaloriePercentage) / 100

    setTargetCaloriesIntake(calculatedTargetCalories)

    setUserData({
      targetCalories: calculatedTargetCalories,
      user: { ...DataLoginUser.user },
    })


  }


  useEffect((): void => {
    const nutrients = [
      "energy-kcal",
      "carbohydrates_100g",
      "proteins_100g",
      "fat_100g",
      "fiber_100g",
      "sodium_100g",
      "sugars_100g",
      "saturated-fat_100g",
    ]

    const mealNutrientSums: { [key: string]: { [key: string]: number } } = {}

    nutrients.forEach(nutrient => {
      mealNutrientSums[nutrient] = {
        breakfast: calculateNutrients(breakfast, nutrient),
        lunch: calculateNutrients(lunch, nutrient),
        dinner: calculateNutrients(dinner, nutrient),
        snacks: calculateNutrients(snack, nutrient),
      }
    })

    const sumNutrient = (nutrient: string) => Object.values(mealNutrientSums[nutrient]).reduce((a, b) => a + b, 0)
    const totalCalories = calculateCalories(breakfast) + calculateCalories(lunch) + calculateCalories(dinner) + calculateCalories(snack)

    setFoodCalories(totalCalories)
    setUserData({
      foodCalories: totalCalories,
      Lunch: lunch,
      Dinner: dinner,
      Breakfast: breakfast,
      Snack: snack,
      lastMeal,
      lastSeenProduct,
      setLastSeenProduct,
      setLastMeal,
      setBreakfast,
      setLunch,
      setDinner,
      setSnack,
      caloriesLunch: calculateCalories(lunch),
      caloriesDinner: calculateCalories(dinner),
      caloriesBreakfast: calculateCalories(breakfast),
      caloriesSnack: calculateCalories(snack),
      proteinConsumed: Math.round(sumNutrient("proteins_100g")),
      carbsConsumed: Math.round(sumNutrient("carbohydrates_100g")),
      fatConsumed: Math.round(sumNutrient("fat_100g")),
      fiberConsumed: Math.round(sumNutrient("fiber_100g")),
      sugarConsumed: Math.round(sumNutrient("sugars_100g")),
      AcideGrasSaturesConsumed: Math.round(sumNutrient("saturated-fat_100g")),
      SodiumConsumed: Math.round(sumNutrient("sodium_100g")),
    })
  }, [breakfast, lunch, dinner, snack, foodCalories])
  useEffect(() => {
    targetCalories()
  }, [DataLoginUser, activityFactor])
  useEffect(() => {
    calculateMacronutrients()
    calculateMicronutrients()

  }, [DataLoginUser])

  return (

    <UserNutritionContext.Provider value={{ ...userData, setUserData }}>
      {children}
    </UserNutritionContext.Provider>
  )
}

export const useUserNutrition = () => useContext(UserNutritionContext)

export { UserNutritionProvider }