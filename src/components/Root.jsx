import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
axios.defaults.withCredentials = true;


function Root() {


  return (
    <div>
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Root
