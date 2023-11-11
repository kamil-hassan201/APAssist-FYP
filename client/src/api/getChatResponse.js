import { api_urls } from './urls';

export const getChatResponse = async ({
  conversation,
  top_3_courses,
  studentCharacteristics,
}) => {
  try {
    const response = await fetch(api_urls.chatCourses, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation,
        top_3_courses,
        studentCharacteristics,
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
