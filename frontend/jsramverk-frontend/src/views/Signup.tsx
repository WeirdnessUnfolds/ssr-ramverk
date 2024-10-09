import React from 'react';

interface SignupProps {
    onSignupSubmit: () => void;
}
function Signup({ onSignupSubmit }: SignupProps) {
   const handleSignupSubmit = () => {
       onSignupSubmit();
   };
  return (
    <div className='logincontainer'>
      <h1>File Editor - Signup</h1>
      <form className='login'>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit" onClick={handleSignupSubmit}>Sign up</button>
      </form>
    </div>
  );
}

export default Signup;