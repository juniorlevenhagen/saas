// services/nutritionService.ts
import { UserGender, UserGoal, UserExercise } from '../types/enums';
import { Meal } from '../models/types';

/**
 * Calcula a Taxa Metabólica Basal (TMB) usando a fórmula de Harris-Benedict
 * @param weight - Peso do usuário em kg
 * @param height - Altura do usuário em cm
 * @param age - Idade do usuário em anos
 * @param gender - Gênero do usuário (MALE ou FEMALE)
 * @returns Taxa metabólica basal em calorias
 */

export class NutritionService {
  private calculateTMB(
    weight: number,
    height: number,
    age: number,
    gender: UserGender,
  ): number {
    if (gender === UserGender.MALE) {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  /**
   * Calcula o total de calorias diárias baseado no objetivo do usuário
   * @param basalCalories - Calorias basais calculadas pela TMB
   * @param goal - Objetivo do usuário (perda de peso, manutenção ou hipertrofia)
   * @returns Total de calorias ajustado conforme o objetivo
   */

  private calculateTotalCalories(
    basalCalories: number,
    goal: UserGoal,
  ): number {
    switch (goal) {
      case UserGoal.WEIGHT_LOSS:
        return basalCalories * 0.8;

      case UserGoal.HYPERTROPHY:
        return basalCalories * 1.5;
      case UserGoal.MAINTENANCE:
        return basalCalories * 1.0;
      default:
        return basalCalories;
    }
  }

  // Novo metodo para calcular macronutrientes

  private getMacronutrientDistribution(goal: UserGoal, totalCalories: number) {
    let proteinRatio = 0.3;
    let carbRatio = 0.5;
    let fatRatio = 0.2;

    if (goal === UserGoal.HYPERTROPHY) {
      proteinRatio = 0.35;
      carbRatio = 0.45;
      fatRatio = 0.2;
    } else if (goal === UserGoal.WEIGHT_LOSS) {
      proteinRatio = 0.4;
      carbRatio = 0.35;
      fatRatio = 0.25;
    }

    return {
      proteins: (totalCalories * proteinRatio) / 4,
      carbs: (totalCalories * carbRatio) / 4,
      fats: (totalCalories * fatRatio) / 9,
    };
  }

  /**
   * Determina o tipo de exercício recomendado baseado no objetivo
   * @param goal - Objetivo do usuário
   * @returns Tipo de exercício recomendado
   */

  private determineExerciseType(goal: UserGoal): UserExercise {
    switch (goal) {
      case UserGoal.WEIGHT_LOSS:
      case UserGoal.MAINTENANCE:
        return UserExercise.AEROBICS;
      case UserGoal.HYPERTROPHY:
        return UserExercise.BODYBUILDING;
      default:
        return UserExercise.AEROBICS;
    }
  }

  /**
   * Gera um menu diário baseado nas calorias totais
   * Divide as calorias em macronutrientes:
   * - 25% proteínas (4 kcal/g)
   * - 50% carboidratos (4 kcal/g)
   * - 25% gorduras (9 kcal/g)
   * @param totalCalories - Total de calorias diárias
   * @returns Array de refeições com alimentos e quantidades
   */

  public generateMenu(goal: UserGoal, totalCalories: number): Meal[] {
    const { proteins, carbs, fats } = this.getMacronutrientDistribution(
      goal,
      totalCalories,
    );

    return [
      {
        meal: 'Breakfast',
        foods: [
          {
            name: `${this.getRandomFood('proteins')} (protein)`, // Adicionando (protein)
            amount: `${(proteins / 3).toFixed(2)}g`,
          },
          {
            name: `${this.getRandomFood('carbs')} (carbs)`, // Adicionando (carbs)
            amount: `${(carbs / 3).toFixed(2)}g`,
          },
          {
            name: `${this.getRandomFood('fats')} (fats)`, // Adicionando (fats)
            amount: `${(fats / 3).toFixed(2)}g`,
          },
        ],
      },
      // Faça o mesmo para Lunch e Dinner
      {
        meal: 'Lunch',
        foods: [
          {
            name: `${this.getRandomFood('proteins')} (protein)`,
            amount: `${(proteins / 3).toFixed(2)}g`,
          },
          {
            name: `${this.getRandomFood('carbs')} (carbs)`,
            amount: `${(carbs / 3).toFixed(2)}g`,
          },
          {
            name: `${this.getRandomFood('fats')} (fats)`,
            amount: `${(fats / 3).toFixed(2)}g`,
          },
        ],
      },
      {
        meal: 'Dinner',
        foods: [
          {
            name: `${this.getRandomFood('proteins')} (protein)`,
            amount: `${(proteins / 3).toFixed(2)}g`,
          },
          {
            name: `${this.getRandomFood('carbs')} (carbs)`,
            amount: `${(carbs / 3).toFixed(2)}g`,
          },
          {
            name: `${this.getRandomFood('fats')} (fats)`,
            amount: `${(fats / 3).toFixed(2)}g`,
          },
        ],
      },
    ];
  }

  private foodOptions = {
    proteins: ['Chicken', 'Fish', 'Eggs', 'Tofu', 'Lean Beef'],
    carbs: ['Brown Rice', 'Sweet Potato', 'Quinoa', 'Oats', 'Whole Bread'],
    fats: ['Avocado', 'Olive Oil', 'Nuts', 'Chia Seeds', 'Peanut Butter'],
  };

  private getRandomFood(type: 'proteins' | 'carbs' | 'fats'): string {
    const options = this.foodOptions[type];
    return options[Math.floor(Math.random() * options.length)];
  }

  /**
   * Calcula o plano nutricional completo do usuário
   * Inclui TMB, calorias totais, tipo de exercício e menu
   * @param weight - Peso do usuário em kg
   * @param height - Altura do usuário em cm
   * @param age - Idade do usuário em anos
   * @param gender - Gênero do usuário
   * @param goal - Objetivo do usuário
   * @returns Objeto com todas as informações nutricionais
   */

  public calculateNutritionPlan(
    weight: number,
    height: number,
    age: number,
    gender: UserGender,
    goal: UserGoal,
  ) {
    const basalCalories = this.calculateTMB(weight, height, age, gender);
    const totalCalories = this.calculateTotalCalories(basalCalories, goal);
    const exercise = this.determineExerciseType(goal);
    const menu = this.generateMenu(goal, totalCalories);

    return {
      basalCalories,
      totalCalories,
      exercise,
      menu,
    };
  }
}

export const nutritionService = new NutritionService();
