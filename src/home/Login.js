import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import event from "../img/event.svg"
import urlInfo from '../config/constants'
import axios from 'axios'
import LoginButton from '../components/LoginButton'
import Profile from '../components/Profile'
const Login = () => {
const token = JSON.parse(localStorage.getItem('token'))

  const Navigate = useNavigate()
  
  useEffect(() => {
    if (token)
    {
      Navigate("/list")
    }
   
  })
   
  return (
    <>
      <div className='loginMain'>
        <div>
           <img src={event} alt="" className='homeImage'/>
           <div className='headingHome'>
          <p>Create Your Event For Free Let's Join</p>
          </div>
        </div>
        <div>
          <LoginButton></LoginButton>
          <Profile></Profile>
        </div>
        
      </div>
      

    </>
  )
}

export default Login