// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import { Meal } from './types'; // Tipos de refeições importados

/**
 * Enum para tipos de exercícios disponíveis
 * Define as modalidades de treino que o usuário pode realizar
 */
export enum UserExercise {
  AEROBICS = 'AEROBICS', // Exercícios aeróbicos (corrida, natação, etc)
  BODYBUILDING = 'BODYBUILDING', // Musculação e exercícios resistidos
}

/**
 * Interface que define a estrutura de um usuário
 * Extends Document para incluir os métodos e propriedades do Mongoose
 */
export type IUser = {
  name: string; // Nome completo do usuário
  age: number; // Idade em anos
  weight: number; // Peso em quilogramas (kg)
  height: number; // Altura em centímetros (cm)
  gender: string; // Gênero do usuário ("MALE" ou "FEMALE")
  goal: string; // Objetivo do usuário ("WEIGHT_LOSS", "MAINTENANCE", "HYPERTROPHY")
  exercise?: UserExercise; // Modalidade de exercício recomendada (opcional)
  basalCalories?: number; // Calorias basais calculadas pela fórmula de Harris-Benedict
  totalCalories?: number; // Calorias totais ajustadas conforme o objetivo
  menu?: Meal[]; // Plano alimentar diário dividido em refeições
} & Document;

/**
 * Schema do Mongoose para o modelo de Usuário
 * Define a estrutura e validações do documento no MongoDB
 */
const UserSchema = new Schema<IUser>({
  // Campos obrigatórios
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },

  // Campos opcionais
  exercise: {
    type: String,
    enum: Object.values(UserExercise), // Valida contra os valores do enum UserExercise
  },
  basalCalories: {
    type: Number,
  },
  totalCalories: {
    type: Number,
  },
  menu: {
    type: Array,
  },
});

// Cria o modelo User usando o schema definido
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
