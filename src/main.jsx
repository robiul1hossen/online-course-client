import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './components/Main/Main.jsx';
import Home from './components/Home/Home/Home.jsx';
import CourseDetails from './components/CourseDetails/CourseDetails.jsx';
import Login from './components/Login/Login.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import SignUp from './components/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LaunchCourse from './components/LaunchCourse/LaunchCourse';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [{
      path: '/',
      element: <Home></Home>
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/signup',
      element:<SignUp></SignUp>
    },
    {
      path: '/courseDetails/:id',
      element:<PrivateRoute><CourseDetails></CourseDetails></PrivateRoute>,
    },
    {
      path:'/launchCourse',
      element:<LaunchCourse></LaunchCourse>
    }
    
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AuthProvider>
    <div className="max-w-screen-xl mx-auto">
      <RouterProvider router={router} />
    </div>
    </AuthProvider>
  </React.StrictMode>
  
)
