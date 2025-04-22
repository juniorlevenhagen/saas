// controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import { nutritionService } from '../services/nutritionService';
import { UserGender, UserGoal } from '../types/enums';

/**
 * Interface para o corpo da requisição de criação de usuário
 * Define os campos obrigatórios para criar um novo usuário
 */
type UserCreateBody = {
  name: string; // Nome completo do usuário
  age: number; // Idade em anos
  weight: number; // Peso em kg
  height: number; // Altura em cm
  gender: UserGender; // Gênero (MALE ou FEMALE)
  goal: UserGoal; // Objetivo (WEIGHT_LOSS, MAINTENANCE, HYPERTROPHY)
};

/**
 * Controller para criação de novo usuário
 * Processa os dados do usuário, calcula o plano nutricional e salva no banco de dados
 *
 * @param req - Request do Express contendo os dados do usuário no body
 * @param res - Response do Express para enviar a resposta
 *
 * @returns {Promise<void>} - Retorna o usuário criado em caso de sucesso ou erro em caso de falha
 *
 * Status codes:
 * - 201: Usuário criado com sucesso
 * - 500: Erro interno do servidor
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    // Extrai os dados do corpo da requisição
    const { name, age, weight, height, gender, goal } =
      req.body as UserCreateBody;

    // Calcula o plano nutricional usando o serviço especializado
    const nutritionPlan = nutritionService.calculateNutritionPlan(
      weight,
      height,
      age,
      gender,
      goal,
    );

    // Cria e salva o novo usuário no banco de dados
    const newUser = await new User({
      name,
      age,
      weight,
      height,
      gender,
      goal,
      ...nutritionPlan, // Spread do plano nutricional (basalCalories, totalCalories, exercise, menu)
    }).save();

    // Retorna o usuário criado com status 201 (Created)
    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    // Log do erro para debugging
    console.error('Error in createUser:', error);

    // Retorna erro 500 em caso de falha
    res.status(500).json({
      success: false,
      message: 'Error creating user',
    });
  }
};
