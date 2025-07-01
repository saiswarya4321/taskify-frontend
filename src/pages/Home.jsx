import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import List from './List';
import AddTodo from './AddTodo';

axios.defaults.withCredentials = true;

function Home() {

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(baseUrl)

  const [todo, setTodo] = useState([])
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/todo/list`, { withCredentials: true })
        setTodo(response.data)
        console.log("Fetched Todos:", response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTodo();

  }, [])
  return (
    <div className='bg-black min-h-screen text-white flex flex-col justify-center  items-center flex-wrap sm:flex-row  gap-2 sm:gap-0 p-10' id='home'>
      <div className='   sm:min-w-[400px] sm:text-xl text-gray-400 basis-1/2 flex justify-center items-start flex-col bg-green-900 rounded-3xl p-2 gap-2 sm:min-h-[600px]'>

<div ><blockquote><p>"A life not lived for others is not a life."</p>
          <footer>-Mother Teresa</footer></blockquote></div>

        <div ><blockquote><p>"The best way to find yourself is to lose yourself in the service of others."</p>
          <footer>-Mahatma Gandhi</footer></blockquote></div>

        <div ><blockquote><p>"Dream is not that which you see while sleeping; it is something that does not let you sleep."</p>
          <footer> -APJ Abdul Kalam</footer></blockquote></div>

        <div ><blockquote><p>"The only way to do great work is to love what you do."</p>
          <footer>-Steve Jobs</footer></blockquote></div>
        
        <div ><blockquote><p>"There is no passion to be found playing small – in settling for a life that is less than the one you are capable of living."</p>
          <footer>-Nelson Mandela</footer></blockquote></div>
      </div>

      <div className='right max-w-[200px] sm:min-w-[500px]  flex flex-row justify-center items-center  p-4 basis-1/2 m-2 rounded-2xl sm:min-h-[600px] bg-green-700'>
        <div className='flex flex-col p-2 gap-4'>
          <Link to={"/addtodo"}><button className='bg-green-800 p-4 rounded-2xl sm:min-w-[300px] flex justify-center'> <p className='mr-2'>Click to add a new one</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

            </button></Link>
          
        </div>

        
      </div>
      
    </div>

  )
}

export default Home
