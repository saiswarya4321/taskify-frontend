import React from 'react'

function Footer() {
  return (
    <div className='  bg-green-800 text-white flex flex-col sm:flex-row justify-evenly items-center gap-3 sm:gap-4 p-4 sm:p-6 border border-gray-700 w-full sm:pb-6'>
      <div className=' text-md max-w-md flex flex-col gap-2'>
        <h3 className=' font-bold text-center'>About</h3>
        <p className='text-xs'>Taskify is a simple and secure todo app that helps <br /> you easily create, manage, and organize your daily <br />tasks  with a clean, responsive design.</p></div>
      <div className='text-md max-w-md flex flex-col gap-2 font-bold'><p>taskify@2025.pvt.limited</p>
      <p className='text-xs font-light'>Developed by Aiswarya</p>
      </div>
      <div className='text-md max-w-md flex flex-col gap-2 '> <p className='font-bold'>Contact us:</p>
        <p className='text-sm'>taskify@gmail.com</p>
     <p  className='text-sm '>8078097889</p>
      </div>
      
    </div>
  )
}

export default Footer
