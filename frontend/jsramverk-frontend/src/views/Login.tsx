import React from 'react';
import axios from 'axios';
import url from '../helpers/url.tsx';
import { useState } from 'react';
interface LoginProps {

    onSignup: () => void;
}
function Login({ onSignup }: LoginProps) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const handleLoginSubmit = async (e : React.FormEvent | React.MouseEvent ) => {
    e.preventDefault();
    axios.post(url + '/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        username: username,
        email: email,
        password: password
    }).then (function(res) {
        console.log(res);
    }).catch(function (err) {
            console.log(err);
        });
  };
   const handleSignupPress = () => {
     onSignup();
   }
  return (
    <div className='logincontainer'>
      <h1>File Editor - Login</h1>
      <form className='login'>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={handleLoginSubmit}>Login</button>
      </form>
      <button type="button" onClick={handleSignupPress}>Register</button>
    </div>
  );
}

export default Login;