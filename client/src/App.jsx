import './styles/App.css';
import './themes/default/main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Assistant from './components/Assistant';
import Registration from './components/Registration';
import Dashboard from './components/Dashboards';
import CourseRecommendation from './components/CourseRecommendation';
import { useState } from 'react';
import { QueryTypeContext } from './contexts/QueryTypeContext';
import { FormSubmittedContext } from './contexts/FormSubmittedContext';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Registration />,
  },
  {
    element: <Dashboard />,
    children: [
      {
        path: '/',
        element: <Assistant />,
      },
      {
        path: '/course-recommendation',
        element: <CourseRecommendation />,
      },
    ],
  },
]);

function App() {
  const [queryType, setQueryType] = useState('chat');
  const [recommendationFormSubmitted, setRecommendationFormSubmitted] =
    useState(false);

  return (
    <FormSubmittedContext.Provider
      value={{ recommendationFormSubmitted, setRecommendationFormSubmitted }}
    >
      <QueryTypeContext.Provider value={{ queryType, setQueryType }}>
        <RouterProvider router={router} />
      </QueryTypeContext.Provider>
    </FormSubmittedContext.Provider>
  );
}

export default App;
