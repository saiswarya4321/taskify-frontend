import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import List from './pages/List'
import AddTodo from './pages/AddTodo'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
axios.defaults.withCredentials = true;

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  // const navigate=useNavigate()
 
  // const checkUser = async () => {
  //   // Trigger Vercel redeployment
  //   //trigger to vercel 
  //     try {
  //       const response = await axios.get(`${baseUrl}/user/profile`, {headers: { 'Content-Type': 'application/json' },
  //          withCredentials: true });
  //       console.log(response.data)
  //       if (response.data.data) {
  //         setIsAuthenticated(true);
  //         localStorage.setItem('isLoggedIn', 'true'); // save status
  //       } else {
  //         setIsAuthenticated(false);
  //        localStorage.removeItem('isLoggedIn'); // clear status
  //         toast.error("You are not logged in")

  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setIsAuthenticated(false);
  //        navigate("/login")
  //     }
  //   };

  //  useEffect(() => {
  //   // Check from localStorage on page load
  //   const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
  //   setIsAuthenticated(loginStatus);
  //   checkUser();
  // }, []);
    

  return (
    <>
    <Home/>
   {/* {isAuthenticated && <List />}  */}
   <List/>
    <AddTodo />
    
      </>
  )
}

export default App
