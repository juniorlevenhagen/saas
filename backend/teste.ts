import { mongoDatabase } from './config/database';

async function testarConexao() {
  try {
    await mongoDatabase.connect();
    console.log('Conectado com sucesso ao MongoDB!');
    console.log('URI utilizada:', process.env.MONGO_URI); // Note o MONGODB_URI aqui
  } catch (error) {
    console.error('Erro na conexão:', error);
    console.error('URI tentada:', process.env.MONGO_URI);
  } finally {
    await mongoDatabase.disconnect();
  }
}

testarConexao();
