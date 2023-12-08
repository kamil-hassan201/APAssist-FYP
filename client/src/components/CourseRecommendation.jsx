import { useContext, useEffect, useState } from 'react';
import useFetch from '../api/useRecommendationFetch';
import RecommendationStudentForm from './RecommendationStudentForm';
import Spinner from './shared/Spinner';
import RecommendationChat from './RecommendationChat';
import { FormSubmittedContext } from '../contexts/FormSubmittedContext';

export default function CourseRecommendation() {
  const { recommendationFormSubmitted, setRecommendationFormSubmitted } =
    useContext(FormSubmittedContext);

  const { loading, fetchData } = useFetch();
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [studentCharacteristics, setStudentCharacteristics] = useState('');

  useEffect(() => {
    if (!loading) {
      setIsVisible(true);
    }
  }, [loading]);

  const handleFormSubmit = async (properties) => {
    setStudentCharacteristics(properties.student_profile);
    setRecommendationFormSubmitted(true);
    setIsVisible(false);
    try {
      const result = await fetchData(properties);
      setData(result.data);
    } catch (error) {
      alert(`Sorry, something went wrong! ${error.message}`);
    }
  };

  return (
    <div className="h-full">
      {!recommendationFormSubmitted ? (
        <RecommendationStudentForm handleFormSubmit={handleFormSubmit} />
      ) : (
        <div className="h-full">
          {loading ? (
            <Spinner label="Analyzing your data, please wait for a moment!" />
          ) : (
            <div
              className={`h-full transition-opacity duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <RecommendationChat
                studentCharacteristics={studentCharacteristics}
                courseInfo={data}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
