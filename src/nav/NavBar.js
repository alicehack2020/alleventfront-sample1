import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./nav.css"
const NavBar = () => {
const navigation=useNavigate()
  const logout = () => {
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
          <div onClick={()=>{logout()}}>
             <Link className='nav_link' >Logout</Link>
           </div>
    </div>
  )
}

export default NavBar