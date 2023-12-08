import { useState } from 'react';
import { api_urls } from './urls';

const useFetch = () => {
  // State to keep track of loading status
  const [loading, setLoading] = useState(false);

  // Function to perform the fetch operation
  const fetchData = async (data) => {
    setLoading(true); // Set loading to true before starting the fetch

    try {
      const response = await fetch(api_urls.recommendation, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setLoading(false);
      return result; // Return the fetched data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false); // Ensure loading is set to false in case of error
      throw error;
    }
  };

  return { loading, fetchData };
};

export default useFetch;
