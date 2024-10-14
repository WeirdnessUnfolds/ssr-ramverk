import React from 'react';

interface LoginProps {

    onSignup: () => void;
}
function Login({ onSignup }: LoginProps) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const handleLoginSubmit = async (e : React.FormEvent | React.MouseEvent ) => {
    e.preventDefault();
   const hash = await matchPass(password)
   const handleSignupPress = () => {
     onSignup();
   }
  return (
    <div className='logincontainer'>
      <h1>File Editor - Login</h1>
      <form className='login'>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit" onClick={handleLoginSubmit}>Login</button>
      </form>
      <button type="button" onClick={handleSignupPress}>Register</button>
    </div>
  );
}

export default Login;