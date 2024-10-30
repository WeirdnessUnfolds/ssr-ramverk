
import bcrypt from 'bcryptjs';
import React, { useState } from 'react';
import axios from 'axios';
import url from '../helpers/url';
interface SignupProps {
  SignupSubmit: () => void;
}


function Signup( {SignupSubmit}: SignupProps) {
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [username, setUsername] = useState('');
   /**
    * Handles the signup form submission.
    * @param e - The event triggered by the form submission, either a React.FormEvent or React.MouseEvent.
    * @returns A Promise<void> indicating the completion of the asynchronous operation.
    */
   const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>): Promise<void> => {
       e.preventDefault();
       if (username === "" || password === "") {
           alert("Please fill in all fields");
       } else {
           const saltrounds: number = 12;
           const hash: string = await bcrypt.hash(password, saltrounds);
           axios.post(url + '/signup', {
               headers: {
                   'Content-Type': 'application/json'
               },
               username: username,
               email: email,
               password: hash
           }).then((result: { data: string }) => {
               if (result.data === 'User with this name or email already exists.') {
                   alert(result.data);
               } else {
                   
                   SignupSubmit();
               }
           }).catch((err: any) => {
               console.log(err);
           });
       }
   };


  return (
    <div className='logincontainer'>
      <h1>File Editor - Registrera</h1>
      <form className='login' onSubmit={handleSignupSubmit}>
        <input type="text" role="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" role="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" role='password'placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button role="signupbtn" type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
