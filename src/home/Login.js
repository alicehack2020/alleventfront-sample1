import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
const Navigate=useNavigate()
  const sendOnHome = () => {
    Navigate("/list")
  } 
  return (
    <>
      <h1>login</h1>
      <button onClick={()=>sendOnHome()}>gmail</button>
     </>
  )
}

export default Login