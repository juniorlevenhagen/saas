import { mongoDatabase } from './config/database';

const testConnection = async () => {
  await mongoDatabase.connect();
  console.log('🎉 Teste concluído!');
  await mongoDatabase.disconnect();
};

testConnection();
