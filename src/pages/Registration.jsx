import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { saveUser } from '../redux/features/userSlice';
axios.defaults.withCredentials = true;

function Registration() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const baseUrl = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '');

    const [formErrors, setFormErrors] = useState({ email: "", password: "" })
    const [data, setData] = useState({ email: "", password: "" })

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value.trim() })

    const validateForm = () => {
        const { email, password } = data;
        let errors = {}
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email!';
            isValid = false;
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long!';
            isValid = false;
        }
        setFormErrors(errors)
        return isValid;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post(`${baseUrl}/user/register`, data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            if (response.status === 201) {
                toast.success("Saved successfully");
                console.log("registered user", response.data.user)
                dispatch(saveUser(response.data.user));
                navigate("/app");
            }

        }
        catch (error) {
            console.log(error)
            toast.error(" Registration failed")
            if (error.response && error.response.data && error.response.data.message) {
                console.error(error.response.data.message); // Show backend message
            } else {
                console.error("Registration failed. Please try again.");
            }
        }
    }
    return (
        <div className='flex justify-center flex-col items-center min-h-screen bg-black lg:flex-row text-white p-3 md:p-5'>

            <form onSubmit={handleSubmit} className='bg-black p-8 rounded-lg shadow-md w-full max-w-md border border-gray-800'>

                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <label htmlFor="email" className='block mb-2 font-medium'>Email :</label>
                <input type='email' id='email' name='email' onChange={handleChange} className='w-full p-2 border border-gray-700 rounded focus:outline-none mb-2' placeholder='Enter your email' />
                {formErrors.email && <p className='text-red-500 text-sm mb-2'>{formErrors.email}</p>}
                <label htmlFor="password" className='block mb-2 font-medium'>Password :</label>
                <input type="password" name="password" id="password" onChange={handleChange} placeholder='Enter your password' className='w-full p-2 mb-2 border border-gray-700 rounded focus:outline-none' />
                {formErrors.password && <p className='text-red-500 text-sm mb-2'>{formErrors.password}</p>}
                <button className='bg-green-600 border-none rounded-lg w-full text-white p-2 mt-2 font-bold' type='submit'>Submit</button>
                <div className='w-max-w-md mt-2 font-medium text-xs text-gray-300'><Link to={"/"}><p> Already have an account?</p></Link></div>
            </form>




        </div>
    )
}

export default Registration
