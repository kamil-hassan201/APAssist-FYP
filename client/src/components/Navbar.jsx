import { NavLink, Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <div className="flex flex-col w-64 bg-white rounded-r-3xl overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-md">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="FlowBite Logo"
            />
            <h1 className="text-2xl font-bold text-gray-700">APAssist</h1>
          </div>
          <ul className="flex flex-col py-4">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Inbox</span>
              </a>
            </li>
            <li>
              <NavLink
                to="/"
                className="px-8 py-2 text-gray-700 hover:bg-gray-200"
              >
                Assistant
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/course-recommendation"
                className="px-8 py-2 mt-2 text-gray-700 hover:bg-gray-200"
              >
                Course Recommendation
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex flex-grow">
          This is children
          {/* Render the child components here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
