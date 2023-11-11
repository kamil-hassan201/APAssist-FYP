const base_api_url = import.meta.env.VITE_APASSIST_BASE_URL;

export const api_urls = {
  query: base_api_url + '/query',
  recommendation: base_api_url + '/recommendation',
  chatCourses: base_api_url + '/chat-courses',
};
