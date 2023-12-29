import React, { useState } from 'react';
import {useNavigate,Link} from "react-router-dom"
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import ErrorMessage from '../../Common/ErrorMessage';
import './Login.css'


const LoginForm = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to authenticate user
      const response = await axios.post('http://localhost:7777/login', {
        username,
        password,
      });
      console.log(response.data); // Handle success response

      const decodedToken = jwtDecode(response.data.token);

      // Store the user role and token in localStorage or a global state management solution
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', decodedToken.user.isAdmin ? 'admin' : 'instructor');

      if (decodedToken.user.isAdmin) {
        navigate('/admin'); 
      } else {
        navigate('/instructor/lectures'); 
      }
    
    } catch (error) {
      console.error('Error logging in:', error); // Handle error
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='loginform'>
      <h2>Login</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        {<input className='login-input' required type="text" placeholder='UserName' value={username} onChange={(e)=>setUsername(e.target.value)}/>}
        {<input className='login-input' required type="password" placeholder='Password'value={password} onChange={(e)=>setPassword(e.target.value)}/>}
        <button className='login-button' type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
    </div>
  );
};

export default LoginForm;