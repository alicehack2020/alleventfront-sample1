import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./nav.css"
import { GoogleLogout } from 'react-google-login';
const NavBar = () => {
const clientId = "164254241743-1mnk3o9k8v4p63851ktbah3kuae0oo9i.apps.googleusercontent.com";
const navigation=useNavigate()
  const onLoginSuccess = () => {
    navigation("/")
  }

  return (
      <div className='nav_header'>
      {/* <Link to="/home">Home</Link> */}
           
          <div>
              <Link to="/" className='nav_link'>Login</Link>
              <Link to="/add" className='nav_link'>Add Event</Link>
              <Link to="/list" className='nav_link'>All Events</Link>
          </div>
          <div>
          <GoogleLogout
      clientId={clientId}
      buttonText="Logout"
      onLogoutSuccess={onLoginSuccess}
    >
    </GoogleLogout>
           </div>
    </div>
  )
}

export default NavBar