import { mongoDatabase } from './config/database';
import { Food } from './src/models/Food';

const testInsertFood = async () => {
  try {
    await mongoDatabase.connect();

    const newFood = new Food({
      name: 'Melao',
      calories: 95,
      protein: 0.5,
      carbs: 25,
      fats: 0.3,
    });

    const savedFood = await newFood.save();
    console.log('Food saved:', savedFood);
  } catch (error) {
    console.error('Error saving food:', error);
  } finally {
    await mongoDatabase.disconnect();
  }
};

testInsertFood();
