


// types.ts
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';

export type Food = {
  name: string;
  amount: string;
};

export type Meal = {
  meal: MealType;
  foods: Food[];
};


