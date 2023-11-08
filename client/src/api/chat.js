import { ConversationChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { BufferMemory } from 'langchain/memory';

const openai_key = import.meta.env.VITE_OPENAI_API_KEY;

const model = new OpenAI({
  modelName: 'text-davinci-003',
  temperature: 0,
  openAIApiKey: openai_key,
});
const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory: memory });

export const getChatResponse = async (message) => {
  console.log('message: ', message);
  const response = await chain.call({
    input: message,
  });

  console.log(response);

  return response.response;
};
