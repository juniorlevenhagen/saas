import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Configurar dotenv
dotenv.config({ path: path.join(__dirname, '..', '.env') });

interface DatabaseConfig {
  connect(): Promise<typeof mongoose>;
  disconnect(): Promise<void>;
}

class MongoDatabase implements DatabaseConfig {
  private readonly uri: string;

  constructor() {
    // Alterado para MONGODB_URI para corresponder ao .env
    this.uri = process.env.MONGO_URI || '';

    if (!this.uri) {
      throw new Error('MongoDB URI não configurada');
    }
  }

  async connect() {
    try {
      return await mongoose.connect(this.uri, {
        serverSelectionTimeoutMS: 5000,
        retryWrites: true,
        w: 'majority',
      });
    } catch (error) {
      console.error('Erro de conexão com MongoDB:', error);
      throw error;
    }
  }

  async disconnect() {
    await mongoose.connection.close();
  }
}

export const mongoDatabase = new MongoDatabase();
