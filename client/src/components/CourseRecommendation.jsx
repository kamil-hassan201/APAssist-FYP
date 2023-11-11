import { useState } from 'react';
import useFetch from '../api/useFetch';
import RecommendationStudentForm from './RecommendationStudentForm';
import Spinner from './shared/Spinner';
import RecommendationChat from './RecommendationChat';

export default function CourseRecommendation() {
  const [submitted, setSubmitted] = useState(false);

  const { loading, fetchData } = useFetch();
  const [data, setData] = useState(null);
  const [studentCharacteristics, setStudentCharacteristics] = useState('');
  const handleFormSubmit = async (studentProfile) => {
    setStudentCharacteristics(studentProfile);
    setSubmitted(true);
    try {
      const result = await fetchData({ student_profile: studentProfile });
      setData(result.data);
    } catch (error) {
      alert(`Sorry, something went wrong! ${error.message}`);
    }
  };
  return (
    <div className="h-full ">
      {/* <div className="text-2xl">Course Recommendation</div> */}
      {!submitted ? (
        <RecommendationStudentForm handleFormSubmit={handleFormSubmit} />
      ) : (
        <div className="h-full">
          {loading ? (
            <Spinner label="Analyzing your data, please wait for a moment!" />
          ) : (
            <RecommendationChat
              studentCharacteristics={studentCharacteristics}
              courseInfo={data}
            />
          )}
        </div>
      )}
    </div>
  );
}
