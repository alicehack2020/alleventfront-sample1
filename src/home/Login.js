import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import event from "../img/event.svg"
import urlInfo from '../config/constants'
import axios from 'axios'
const Login = () => {
const Navigate=useNavigate()
 const getUser = async () => {
  // try {
  //   const url = `${urlInfo.REACT_APP_API_URL}/auth/login/success`;
  //   await axios.get(url, { withCredentials: true }).then((data) => {
  //    localStorage.setItem('email', JSON.stringify(data.data.data.data.email))
  //   localStorage.setItem('user',JSON.stringify(data.data.data.data.name))
  //   localStorage.setItem('profileUrl',JSON.stringify(data.data.data.data.imageUrl))
  //   localStorage.setItem('token', JSON.stringify(data.data.data.token))
  //   Navigate("/list")

  //   }) 
  
  // } catch (err) {
  //   console.log("data")
  //   console.log(err);
  // }
  // };
  



  try {
    const info = await axios.get("https://alleventbackendupdated.onrender.com/auth/login/success").then((data) => {
   console.log(data)
      localStorage.setItem('email', JSON.stringify(data.data.data.data.email))
    localStorage.setItem('user',JSON.stringify(data.data.data.data.name))
    localStorage.setItem('profileUrl',JSON.stringify(data.data.data.data.imageUrl))
      localStorage.setItem('token', JSON.stringify(data.data.data.token))
      Navigate("/list")
     }) 
  } catch (error) {
    console.log(err);
  }
  
useEffect(() => {
  getUser();
},);

 
  
   

  const googleAuth = () => {
		window.open(
			`${urlInfo.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};

  return (
    <>
      <div className='loginMain'>
        <div>
           <img src={event} alt="" className='homeImage'/>
        </div>
        <div on onClick={googleAuth} className='logOut'>
          Login With Gmail
         </div>
         
        
      </div>
      <div className='headingHome'>
        <p>Create Your Event For Free Let's Join</p>
      </div>
      
      
    
    </>
  )
}

export default Login