import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    
    <BrowserRouter>
    <Auth0Provider
    domain="dev-aubtjeu0ort13nat.us.auth0.com"
    clientId="wRNAlbIWGv4Uxp6ywhwiAwxW8DJPU9in"
    authorizationParams={{
    redirect_uri: window.location.origin
    }}>
    <App />
    </Auth0Provider>
    </BrowserRouter>
);


