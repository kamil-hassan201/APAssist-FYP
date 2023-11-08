import './App.css';
import './themes/default/main.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Assistant from './components/Assistant';
import Registration from './components/Registration';
import Dashboard from './components/Dashboards';
import CourseRecommendation from './components/CourseRecommendation';

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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
