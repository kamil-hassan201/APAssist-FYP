import { useState } from 'react';
import useFetch from '../api/useFetch';
import RecommendationStudentForm from './RecommendationStudentForm';
import Spinner from './shared/Spinner';
import RecommendationChat from './RecommendationChat';

export default function CourseRecommendation() {
  const [submitted, setSubmitted] = useState(false);

  const { loading, fetchData } = useFetch();
  const [data, setData] = useState(null);
  const handleFormSubmit = async (student_profile) => {
    setSubmitted(true);
    try {
      const result = await fetchData({ student_profile });
      setData(result.data);
    } catch (error) {
      alert('Sorry, something went wrong!');
    }
  };
  return (
    <div className="h-full ">
      {/* <div className="text-2xl">Course Recommendation</div> */}
      {!submitted ? (
        <RecommendationStudentForm handleFormSubmit={handleFormSubmit} />
      ) : (
        <div className="h-full">
          {loading ? <Spinner /> : <RecommendationChat course_info={data} />}
        </div>
      )}
    </div>
  );
}
