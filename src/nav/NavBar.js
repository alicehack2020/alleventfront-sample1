import React from 'react'
import { Link } from 'react-router-dom'
import "./nav.css"
const NavBar = () => {
  return (
      <div className='nav_header'>
              {/* <Link to="/home">Home</Link> */}
              <Link to="/" className='nav_link'>Login</Link>
              <Link to="/add" className='nav_link'>add</Link>
              <Link to="/list" className='nav_link'>list</Link>
    </div>
  )
}

export default NavBar