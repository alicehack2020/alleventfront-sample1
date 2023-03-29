import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import gmail from "../img/gmail.png"
import event from "../img/event.svg"
import festival from "../img/festival.svg"
const Login = () => {
const Navigate=useNavigate()
  const sendOnHome = () => {
    Navigate("/list")
  } 
  return (
    <>
      <div className='loginMain'>
        <div>
           <img src={event} alt="" className='homeImage'/>
        </div>
        <div className='loginForm'>
          <div className='gmailButton'>
            <img src={gmail} alt="" />
            <button onClick={()=>sendOnHome()}>Login with Gmail</button>
          </div>

          
        </div>
      </div>
      <div className='headingHome'>
        <p>Create Your Event For Free Let's Join</p>
      </div>
      
      
    
    </>
  )
}

export default Login