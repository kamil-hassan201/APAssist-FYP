import './styles/App.css';
import './themes/default/main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Assistant from './components/Assistant';
import Registration from './components/Registration';
import Dashboard from './components/Dashboards';
import CourseRecommendation from './components/CourseRecommendation';
import { useState } from 'react';
import { QueryTypeContext } from './contexts/QueryTypeContext';

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
  const [queryType, setQueryType] = useState('simple');

  return (
    <QueryTypeContext.Provider value={{ queryType, setQueryType }}>
      <RouterProvider router={router} />
    </QueryTypeContext.Provider>
  );
}

export default App;
