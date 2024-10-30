import React from 'react';
import axios from 'axios';
import url from '../helpers/url';
import { useState } from 'react';
interface LoginProps {
  onLogin: () => void;
  onSignup: () => void;
}
function Login({ onLogin, onSignup }: LoginProps) {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const handleLoginSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + '/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        username: username,
        password: password
      });

      if (response.data === "Match") {
        try {
          const tokenResponse = await axios.post(url + '/gettoken', {
            username: username
          });
          const token = tokenResponse.data;
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          onLogin(); // Call the original onLogin function
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Wrong username or password");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignupPress = () => {
    onSignup();
  }
  return (
    <div className='logincontainer'>
      <h1>File Editor - Login</h1>
      <form className='login'>
        <input type="text" placeholder="Användarnamn" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Lösenord" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={handleLoginSubmit}>Logga in</button>
      </form>
      <button className="registerBtn" type="button" onClick={handleSignupPress}>Registrera</button>
    </div>
  );
}

export default Login;