import React, { useEffect } from "react";
import sjcl from 'sjcl';
import { useAuth0 } from "@auth0/auth0-react";
 import axios from "axios";
import urlInfo from "../config/constants";
import {useNavigate } from "react-router-dom";
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const Navigate=useNavigate()
 
useEffect(() => {
    loadUserData()
}, user) 
    
const loadUserData = () => {
    const data = {
      email: user?.email,
      name: user?.name,
      userImage: user?.picture
    };
    if (user?.email) {
      try {
          userLogin(data); 
      } catch (error) {
        console.log("error===>1", error);
      }
    }
  }
    
 
 
    const userLogin = async (data) => {
        try {
            await axios.post(`${urlInfo.REACT_APP_API_URL}/auth/login`, { data })
                .then(response => {
                    const info = response.data.data.data
                    const token=response.data.data.token
                console.log("response====_______________", response)
                localStorage.setItem("token",JSON.stringify(token))
                localStorage.setItem("name",JSON.stringify(info.name))
                localStorage.setItem("imageUrl", JSON.stringify(info.imageUrl))
                Navigate("/list")
        })
        .catch(error => {
        // Handle error
            console.log("error___________________",error)
        });
        } catch (error) {
          console.log("error===>2",error)  
        }

        
}

  return (
      <div>
      </div>
  );
};

export default Profile;