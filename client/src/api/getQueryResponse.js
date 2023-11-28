import { api_urls } from './urls';

export const getQueryResponse = async (chatMessages, queryType = 'chat') => {
  try {
    const response = await fetch(api_urls.query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatMessages,
        queryType,
      }),
    });

    if (!response.ok) {
      throw Error('Network response was not ok');
    }

    return response;
  } catch (error) {
    throw Error(`Something went wrong! ${error.message}`);
  }
};
