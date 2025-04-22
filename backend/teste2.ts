import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Carrega o .env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Usa a API Key do .env
});

async function getAIResponse() {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'write a haiku about ai' }],
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error('Erro ao chamar a API:', error);
  }
}

getAIResponse();
