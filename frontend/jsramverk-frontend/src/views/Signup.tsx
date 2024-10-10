import React from 'react';
import { bcrypt } from 'bcryptjs';
import { useState, ChangeEvent } from 'react';



function Signup() {
   const [password, setPassword] = useState('');
   const handleSignupSubmit = (e : ChangeEvent<HTMLFormElement> ) => {
       const saltrounds = 12;
       console.log(password);
   };
  return (
    <div className='logincontainer'>
      <h1>File Editor - Signup</h1>
      <form className='login'>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" role='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" role='confirmpassword' placeholder="Confirm Password" />
        <button type="submit" onClick={handleSignupSubmit}>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;