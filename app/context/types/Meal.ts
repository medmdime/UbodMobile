// Portion type
export type NutrimentInformation = {
  carbohydrates?: number;
  carbohydrates_100g?: number;
  carbohydrates_unit?: string;
  carbohydrates_value?: number;
  energy?: number;
  energy_kcal?: number;
  energy_kcal_100g?: number;
  energy_kcal_unit?: string;
  energy_kcal_value?: number;
  energy_kcal_value_computed?: number;
  energy_100g?: number;
  energy_unit?: string;
  energy_value?: number;
  fat?: number;
  fat_100g?: number;
  fat_unit?: string;
  fat_value?: number;
  proteins?: number;
  proteins_100g?: number;
  proteins_unit?: string;
  proteins_value?: number;
  salt?: number;
  salt_100g?: number;
  salt_unit?: string;
  salt_value?: number;
  'saturated-fat'?: number;
  'saturated-fat_100g'?: number;
  'saturated-fat_unit'?: string;
  'saturated-fat_value'?: number;
  sodium?: number;
  sodium_100g?: number;
  sodium_unit?: string;
  sodium_value?: number;
  sugars?: number;
  sugars_100g?: number;
  sugars_unit?: string;
  sugars_value?: number;
};

// Meal type
export type Meal = {
  _id: string;
  nutriments: NutrimentInformation;
  nutrimentsPortion?: NutrimentInformation;
  portion: number;
  serving_quantity?: number;
  product_name: string;
  uniqueId: number;
  nutriscore_grade?: string;
  nova_group?: number;
  image_url?: string;
};

const defaultPortion: NutrimentInformation = {
  "saturated-fat": 0,
  "saturated-fat_100g": 0,
  "saturated-fat_unit": "",
  "saturated-fat_value": 0,
  carbohydrates: 0,
  carbohydrates_100g: 0,
  carbohydrates_unit: "",
  carbohydrates_value: 0,
  energy: 0,
  energy_100g: 0,
  energy_kcal: 0,
  energy_kcal_100g: 0,
  energy_kcal_unit: "",
  energy_kcal_value: 0,
  energy_kcal_value_computed: 0,
  energy_unit: "",
  energy_value: 0,
  fat: 0,
  fat_100g: 0,
  fat_unit: "",
  fat_value: 0,
  proteins: 0,
  proteins_100g: 0,
  proteins_unit: "",
  proteins_value: 0,
  salt: 0,
  salt_100g: 0,
  salt_unit: "",
  salt_value: 0,
  sodium: 0,
  sodium_100g: 0,
  sodium_unit: "",
  sodium_value: 0,
  sugars: 0,
  sugars_100g: 0,
  sugars_unit: "",
  sugars_value: 0
};
export const defaultMeal : Meal = {
  _id: '',
  nutriments: defaultPortion,
  nutrimentsPortion: defaultPortion,
  portion: 1,
  product_name: '',
  uniqueId: 0,
  nutriscore_grade: '',
  nova_group: 0,
  image_url: '',
  serving_quantity: 100,
}

export const calculateNewPortion = (portion: NutrimentInformation, scaleFactor: number): NutrimentInformation => {

  const updatedPortion: NutrimentInformation = defaultPortion;
  Object.entries(portion).forEach(([key, value]) => {
    if (typeof value === 'number') {
      updatedPortion[key] = Math.round(value * scaleFactor);
    }
  });

  return updatedPortion;
};
export const updateNutriments = (meal: Meal, portionValue = 1 ): Meal => {
  return {
    _id: meal?._id,
    nutriments: meal?.nutriments,
    nutrimentsPortion: calculateNewPortion(meal.nutriments, portionValue),
    portion: portionValue,
    product_name: meal?.product_name,
    uniqueId: meal?.uniqueId,
    nutriscore_grade: meal?.nutriscore_grade ?? '',
    nova_group: meal?.nova_group ?? 0,
    image_url: meal?.image_url,
    serving_quantity: meal?.serving_quantity ?? 100,
  };
}
