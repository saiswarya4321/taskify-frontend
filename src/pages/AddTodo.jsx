import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useOutletContext } from 'react-router-dom';
axios.defaults.withCredentials = true;


function AddTodo() {

  const { fetchTodo } = useOutletContext();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  // const user = useSelector((state) => state.user.value);
  const navigate=useNavigate()
  
  const [todo, setTodo] = useState({
    name: '',
    description: '',
    eventDate: ''
  });

  const[formErrors,setFormErrors]=useState({name:""})

  const validateForm=()=>{
  const{name}=todo;
  let errors={}
  let isValid=true;

  if(name.trim()===''){
    errors.name='Please enter your event name';
    isValid=false;
  }
  setFormErrors(errors)
  return isValid;
}

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()){
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/todo/add`, todo, { withCredentials: true });
      toast.success("Todo Added Successfully");
      fetchTodo();
      setTodo({ name: '', description: '', eventDate: '' });
      console.log(response.data);
      navigate("/")
    } catch (error) {
      console.error(error);
      toast.error("Failed to add todo ");
      
      
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Add Todo</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6  sm:w-full max-w-md bg-black text-gray-200 p-6 border border-gray-700 m-2">
        <p className='text-xs text-yellow-600'>* Mandatory</p>
        <input
          type="text"
          name="name"
          placeholder="Todo Name"
         
          onChange={handleChange}
          className="p-2 rounded border border-gray-700 text-gray-200"
          value={todo.name}
        />
         {formErrors.name && <p className='text-red-500 text-sm mb-2'>{formErrors.name}</p>}
        <textarea type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="p-3 rounded border border-gray-700 text-gray-200 min-h-[200px]"
          value={todo.description}
          ></textarea>
        <input
          type="date"
          name="eventDate"
          onChange={handleChange}
          className="p-2 rounded border border-gray-700  text-gray-200" 
          value={todo.eventDate}
        />
        <button type="submit" className="bg-green-800 p-2  rounded-4xl text-white font-bold">
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
