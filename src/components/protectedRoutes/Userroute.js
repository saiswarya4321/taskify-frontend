import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

export default function Userroute({children}) {

    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');

    const[data,setData]=useState(null);
    const navigate=useNavigate();
  
const checkUser=async()=>{
    try {
        const response =await axios.get(`${baseUrl}/user/profile`,{ withCredentials: true })
        if(response.data.data){
            setData(response.data.data);
        }
        else{
            navigate("/login")
            console.log("you have to login first")
        }
    } catch (error) {
        console.log(error);
        
    }
}

useEffect(()=>{
checkUser();
},setData,navigate)

return data?children:null;


}
