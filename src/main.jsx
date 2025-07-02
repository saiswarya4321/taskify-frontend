import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root.jsx';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Home from './pages/Home.jsx';

import { Provider } from 'react-redux'
import store from './redux/app/store.js';
import AddTodo from './pages/AddTodo.jsx';
import List from './pages/List.jsx';
import Userroute from './components/protectedRoutes/Userroute.js';
import Updatetodo from './pages/Updatetodo.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,

      },
      {
        path: "/app",
        element: <App />,

      },
      {
        path: "/home",
        element: <Home />,

      },
      
      {
        path: "/registration",
        element: <Registration />,

      },
      {
        path: "/addtodo",
        element: <AddTodo />,

      },
      {
        path: "/list",
        element: 
     <List />
  
      },

{
        path: "/updatetodo/:id",
        element: <Updatetodo />,

      },
    ],
  },

]);


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <>
      <Provider store={store}>

        <RouterProvider router={router} />

        <ToastContainer />
      </Provider>

    </>
  </StrictMode>

)
