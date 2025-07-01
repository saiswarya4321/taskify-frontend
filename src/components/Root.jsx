import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
axios.defaults.withCredentials = true;


function Root() {

const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  console.log(baseUrl)

  const [todo, setTodo] = useState([])
  const fetchTodo = async () => {
      try {
        const response = await axios.get(`${baseUrl}/todo/list`, { withCredentials: true })
        setTodo(response.data)
        console.log("Fetched Todos:", response.data)
      } catch (error) {
        console.log(error)
      }
    }
  useEffect(() => {
    
    fetchTodo();

  }, [])


  return (
    <div>
      <Header/>
      <Outlet context={{ todo, fetchTodo }} />
      <Footer/>
    </div>
  )
}

export default Root
