import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
import gmail from "../img/gmail.png"
import event from "../img/event.svg"
import festival from "../img/festival.svg"
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
const Navigate=useNavigate()
const clientId = "164254241743-1mnk3o9k8v4p63851ktbah3kuae0oo9i.apps.googleusercontent.com";
  
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    Navigate("/list")
};

const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
};
  return (
    <>
      <div className='loginMain'>
        <div>
           <img src={event} alt="" className='homeImage'/>
        </div>
         
          <GoogleLogin
              clientId={clientId}
              buttonText="Sign In"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}>Login with Gmail</GoogleLogin>
        
      </div>
      <div className='headingHome'>
        <p>Create Your Event For Free Let's Join</p>
      </div>
      
      
    
    </>
  )
}

export default Login