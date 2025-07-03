import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


axios.defaults.withCredentials = true;


import { toast } from 'react-toastify';




function List() {
 const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');
  console.log(baseUrl)
  const navigate=useNavigate()

  const [todo, setTodo] = useState([])

  useEffect(() => {
    const fetchTodo = async () => {
        try {
            const response = await axios.get(`${baseUrl}/todo/list`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            setTodo(response.data)
            console.log("Fetched Todos:", response.data)
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch todos.")
        }
    }

    fetchTodo()
}, [])

  

 
const handleDelete=async(id)=>{
try {
  const response= await axios.delete(`${baseUrl}/todo/delete/${id}`,{headers: { 'Content-Type': 'application/json' },withCredentials:true})
  toast.success("Deleted successfully");
   
   setTodo(todo.filter(todoo => todoo._id !== id));
  
  
} catch (error) {
  console.log("deleted");
  toast.success("Deleted successfully");
}
}

 return (
  <div className='bg-black min-h-screen text-white flex flex-col sm:flex-row justify-center sm:items-center flex-wrap gap-2 md:gap-0 p-10' id='listTodo'>

    {todo?.length > 0 ? (
      todo.map((t, index) => (
        <div key={index} className=' sm:basis-1/4 p-2 min-w-[100px]'>

          <div className='flex flex-row justify-center  sm:p-2 w-full gap-3 '>
            <Link to={`/updatetodo/${t._id}`}>
              <div className='bg-green-800 p-4 rounded-2xl hover:bg-green-200'>
                <p className='text-xs text-gray-300'>Added on {t.date}</p>
                <h2 className='text-center text-md'>{t.name}</h2>
              </div>
            </Link>

            <div className='flex flex-row justify-center items-center gap-3'>
              <button onClick={() => handleDelete(t._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      ))

    ) : (
      <div className='mt-3 sm:mt-6 bg-green-600 text-gray-100 p-3 w-full text-center sm:max-w-[600px] rounded'>
        No todos added.
      </div>
    )}

  </div>
)

}

export default List
