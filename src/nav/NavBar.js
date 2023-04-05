import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./nav.css"
 const NavBar = () => {
 const [token,setToken] =useState()

const [login,setLogin]=useState(false)
  
  const navigation = useNavigate()
  

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

    const logout = async () => {
    //   try {
    //     await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`,{ headers: {"Authorization" : `Bearer ${token}`} }).then((res) => {
    //       localStorage.clear();
    //       setLogin(false)
    //       navigation('/')
    //     }).catch((error) => {
    //      console.log(error)
    //    })
    //  } catch (error) {
       
    //   } 
      
    localStorage.clear();
    setLogin(false)
      
    window.open(
			`${process.env.REACT_APP_API_URL}/auth/logout`,
			"_self"
		);
    
	};

  return (
      <div className='nav_header'>
      {/* <Link to="/home">Home</Link> */}
           
      <div>
        {
          login?<div></div>:<Link to="/" className='nav_link'>Home</Link>
        }
        {
          login?<div className='navButton'><Link to="/add" className='nav_link'>Add Event</Link>
              <Link to="/list" className='nav_link'>All Events</Link></div>:<div></div>
        }    
      </div>
      
      
      {login ? <div onClick={logout} className='logOut'>
        logout
        {/* <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLoginSuccess}
        >
        </GoogleLogout> */}
      </div>:<div></div>}
    </div>
  )
}

export default NavBar