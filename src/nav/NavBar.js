import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import urlInfo from '../config/constants'
import { useAuth0 } from "@auth0/auth0-react";
import "./nav.css"
import LogoutButton from '../components/LogoutButton'
 const NavBar = () => {
 const [token,setToken] =useState()
 const { logout } = useAuth0();
const [login,setLogin]=useState(false)
  
  const navigation = useNavigate()
  
   const logOutUser = () => {
     localStorage.clear();
     setLogin(false)
     setTimeout(() => {
      logout({ logoutParams: { returnTo: window.location.origin } })
     }, 1000)
     setTimeout(() => {
      navigation("/")
     },2000)  
}

  useEffect(() => {
    if (token)
    {
      setLogin(true)
    }
  }, token)
  

  useEffect(() => {
    try {
       
      let userToken = JSON.parse(localStorage.getItem('token'))
      setToken(userToken)
    } catch (error) {
      
    }
  })

  return (
      <div className='nav_header'>
           
      <div>
        {
          login?<div></div>:<Link to="/" className='nav_link'>Home</Link>
        }
        {
          login?<div className='navButton'><Link to="/add" className='nav_link'>Add Event</Link>
              <Link to="/list" className='nav_link'>All Events</Link></div>:<div></div>
        }    
      </div>
      
      
      {login ? <div>
         <button onClick={logOutUser} className='logOut'>logout</button>
      </div>:<div></div>}
    </div>
  )
}

export default NavBar