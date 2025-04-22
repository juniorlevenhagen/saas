import mongoose, { Schema, Document } from 'mongoose';

export interface IFood extends Document {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;

}

const FoodSchema = new Schema<IFood>({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
});

export const Food = mongoose.model<IFood>('Food', FoodSchema);