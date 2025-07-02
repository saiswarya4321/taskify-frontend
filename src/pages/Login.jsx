import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/features/userSlice';


axios.defaults.withCredentials = true;
function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  
  const navigate = useNavigate();
  const dispatch=useDispatch();

  

  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value.trim() })



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${baseUrl}/user/login`, data, {headers: { 'Content-Type': 'application/json' },
         withCredentials: true })
      //  dispatch(saveUser(response.data.user.id)); 
      localStorage.setItem('isLoggedIn', 'true');


        console.log("user", response.data.user);
      toast.success("Login")
      
      navigate("/app")
      // window.location.href = "/app";
window.location.reload();

       
     
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login failed || User not exist");
    }


  }
  return (
    <div className='flex justify-center flex-col items-center min-h-screen bg-black md:flex-row text-white p-3 md:p-5'>
      <div className='p-5 rounded-lg w-full max-w-md font-sans '><h2 className='font-extrabold text-2xl '>Login Now</h2>
        <p className='font-light text-sm pt-2 text-gray-200'>Stay organized and boost your productivity with our Todo App. Easily add, track, and manage your daily tasks in one place.
        </p>
      </div>
      <form action="" onSubmit={handleSubmit} className='bg-black p-6 rounded-lg border border-gray-700 shadow-amber-50 w-full max-w-md font-sans  text-gray-200 '>


        <label htmlFor="email" className='block mb-2 font-medium'>Email :</label>
        <input type='text' id='email' name='email' required onChange={handleChange} className='w-full p-2 border border-gray-700 rounded focus:outline-none mb-2' placeholder='Enter your email' />
        
        <label htmlFor="password" className='block mb-2 font-medium'>Password :</label>
        <input type="text" name="password" id="password" required onChange={handleChange} placeholder='Enter your password' className='w-full p-2 mb-2 border border-gray-700 rounded focus:outline-none' />
         
        <button className='bg-green-600 border-none rounded-xl w-full text-white p-2 mt-2  font-bold' type='submit'>Login</button>
        <div className='w-max-w-md mt-2 font-medium text-xs'><Link to={"/registration"}><p>New user</p></Link></div>

      </form>

    </div>
  )
}

export default Login
