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
      return 66.5 + 13.75 * weight + 5.003 * height - 6.755 * age;
    }
    return 65.5 + 9.563 * weight + 1.85 * height - 4.676 * age;
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

  private generateMenu(totalCalories: number): Meal[] {
    const proteins = (totalCalories * 0.25) / 4;
    const carbs = (totalCalories * 0.5) / 4;
    const fats = (totalCalories * 0.25) / 9;

    return [
      {
        meal: 'Breakfast',
        foods: [
          { name: 'Eggs', amount: `${(proteins / 3).toFixed(2)}g` },
          { name: 'Whole bread', amount: `${(carbs / 3).toFixed(2)}g` },
          { name: 'Avocado', amount: `${(fats / 3).toFixed(2)}g` },
        ],
      },
      {
        meal: 'Lunch',
        foods: [
          { name: 'Grilled chicken', amount: `${(proteins / 3).toFixed(2)}g` },
          { name: 'Brown rice', amount: `${(carbs / 3).toFixed(2)}g` },
          { name: 'Olive oil', amount: `${(fats / 3).toFixed(2)}g` },
        ],
      },
      {
        meal: 'Dinner',
        foods: [
          { name: 'Fish', amount: `${(proteins / 3).toFixed(2)}g` },
          { name: 'Sweet potato', amount: `${(carbs / 3).toFixed(2)}g` },
          { name: 'Nuts', amount: `${(fats / 3).toFixed(2)}g` },
        ],
      },
    ];
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
    const menu = this.generateMenu(totalCalories);

    return {
      basalCalories,
      totalCalories,
      exercise,
      menu,
    };
  }
}

export const nutritionService = new NutritionService();
