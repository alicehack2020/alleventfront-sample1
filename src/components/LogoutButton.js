import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth0();
const Navigate=useNavigate()
    
const logOutUser = () => {
        localStorage.clear();
        Navigate("/")
        logout({ logoutParams: { returnTo: window.location.origin } })
}
  return (
    <button onClick={logOutUser}>
      Log Out
    </button>
  );
};

export default LogoutButton;