import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

function Updatetodo() {

  const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');

  const [todo, setTodo] = useState({
  name: '',
  description: '',
  eventDate: '',
  
});
  const navigate=useNavigate()

  const { id } = useParams();
  
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todo/listone/${id}`, {
        withCredentials: true
      })
      console.log(response.data.todo)
      setTodo(response.data.todo)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTodos();
    console.log("id", id)
  }, [])

  const[formErrors,setFormErrors]=useState({name:""})
  
    const validateForm=()=>{
    const{name}=todo;
    let errors={}
    let isValid=true;
  
    if(!name || name.trim() === ''){
      errors.name='Please enter your event name';
      isValid=false;
    }
    setFormErrors(errors)
    return isValid;
  }
  

  const handleChange = (e) => setTodo({ ...todo, [e.target.name]: e.target.value })
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if(!validateForm()){
      return;
    }
    try {
      const response = await axios.put(`${baseUrl}/todo/update/${id}`, todo, {
        withCredentials: true
      })
      toast.success("Updated successfully")
      navigate("/app")
    } catch (error) {
      console.log("Error in updating");
      toast.success("Error in updation")
    }
  }


  return (
    <div className='min-h-screen bg-black text-white flex flex-col justify-center items-center gap-2 md:flex-row'>
      <div id='left' className='bg-red-950 text-gray-400 flex flex-col items-center justify-center  min-h-[300px] sm:min-h-[500px] sm:text-xl text-sm p-2 border border-gray-600 m-3 sm:max-w-[500px] rounded '>

        <p>This Todo website is a user-friendly task management application that allows users to efficiently
          organize their daily activities. With a simple and intuitive interface, description, and

          optional event date to help manage schedules effectively. The application ensures that users
          can securely access and manage their personal  todos through authentication. It supports real-time
          updates and seamless navigation, offering a  smooth experience.Designed with a clean layout and essential
          features, this Todo website helps users stay focused, productive, and in control of their tasks.</p>
      </div>


      <div id='right' className='flex m-2'>
        <form onSubmit={handleUpdateTodo} className='flex flex-col justify-center rounded  border border-gray-700 p-5 gap-3 sm:min-w-[500px] sm:w-full '>
          <p className='font-bold'>Add your changes</p>
          <div>

            <p className='text-xl text-gray-500 border border-gray-500 p-2 '>{todo.date}</p></div>
          <div><input type="text" name='name' value={todo.name} placeholder='Name' className='text-white border border-gray-500 p-2 w-full' onChange={handleChange} />
           {formErrors.name && <p className='text-red-500 text-sm mb-2'>{formErrors.name}</p>}
          </div>
          <div><textarea name="description" id="" value={todo.description} placeholder='Description' className='w-full text-white border border-gray-500 p-2 min-h-[200px]' onChange={handleChange}></textarea></div>
          <div><input type="date" name="eventDate" value={todo.eventDate} placeholder='Date' className='text-gray-500 border border-gray-500 p-2 w-full ' onChange={handleChange} /></div>
          <div><button type='submit' className='bg-green-500 p-2 rounded'>Update</button></div>
        </form>
      </div>


    </div>
  )
}

export default Updatetodo
