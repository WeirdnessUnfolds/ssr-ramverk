
import bcrypt  from 'bcryptjs';
import React, { useState } from 'react';
import axios from 'axios';
import url from '../helpers/url.tsx';
interface SignupProps {
  SignupSubmit: () => void;
}


function Signup( {SignupSubmit}: SignupProps) {
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   const handleSignupSubmit = async (e : React.FormEvent | React.MouseEvent ) => {
        e.preventDefault();
       const saltrounds = 12;
       const hash = await bcrypt.hash(password, saltrounds);
           axios.post(url + '/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
               username: username,
               email: email,
               password: hash     
           }).then(function () {
            SignupSubmit();
            
        })
            .catch(function (err) {
                console.log(err);
            });
   };

  
  return (
    <div className='logincontainer'>
      <h1>File Editor - Signup</h1>
      <form className='login' onSubmit={handleSignupSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" role='password'placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;