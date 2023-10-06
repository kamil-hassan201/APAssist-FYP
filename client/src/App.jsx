import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Assistant from './components/Assistant';
import Registration from './components/Registration';
import Dashboard from './components/Dashboards';

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
        element: <div>Hello world! Course Recommendation</div>,
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
