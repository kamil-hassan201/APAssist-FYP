import { api_urls } from './urls';

export const getQueryResponse = async (prompt) => {
  const response = await fetch(api_urls.query, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });
  return response;
};
