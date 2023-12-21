import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Home from './Components/Home/Home';
import AuthProvider from './Components/Provider/AuthProvider';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Errorpage from './Components/Errorpage/Errorpage';
import DashBoard from './Components/DashBoard/DashBoard';
import UserProfile from './Components/DashBoard/UserProfile';
import CreateTask from './Components/DashBoard/CreateTask';
import AllTasks from './Components/DashBoard/AllTasks';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Privet from './Components/Privat/Privat';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Errorpage></Errorpage>,
    children: [
      {
      path: '/',
      element: <Home></Home>
    },
    {
      path: '/register',
      element: <Register></Register>
    },
    {
      path: 'login',
      element: <Login></Login>
    }
  ]
  },
  {
    path: 'dashboard',
    element: <Privet><DashBoard></DashBoard></Privet>,
    children: [
      {
        path: "userprofile",
        element:<UserProfile></UserProfile>,
        loader:()=> fetch('http://localhost:5000/users')
      },
      {
        path:"addTask",
        element:<Privet><CreateTask></CreateTask></Privet>
      },
      {
        path: "alltask",
        element:<AllTasks></AllTasks>,
        loader: ()=> fetch('http://localhost:5000/addTask')
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
    
    </AuthProvider>
  </React.StrictMode>,
)
