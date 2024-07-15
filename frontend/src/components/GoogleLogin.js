import React from 'react';
import GoogleLogin from 'react-google-login';
import './styles/GoogleLogin.css';

const GoogleLoginComponent = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <div className="google-login-container">
      <div className="google-login-button">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
};

export default GoogleLoginComponent;
