// LoginScreen.tsx
import React from 'react';

interface LoginProps {
    onLoginSubmit: () => void;
}
function Login({ onLoginSubmit }: LoginProps) {
   const handleLoginSubmit = () => {
       onLoginSubmit();
   };
  return (
    <div className='logincontainer'>
      <h1>File Editor - Login</h1>
      <form className='login'>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" onClick={handleLoginSubmit}>Login</button>
      </form>
      <button type="button">Register</button>
    </div>
  );
}

export default Login;