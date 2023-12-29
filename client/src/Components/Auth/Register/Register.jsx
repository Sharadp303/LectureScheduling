
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

import axios from 'axios';
import './Register.css'
import SucessMessage from '../../Common/SucessMessage';

const RegistrationForm = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sucess, setSucess] = useState(null);

  const navigate=useNavigate()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to register a new user
      const response = await axios.post(`${process.env.REACT_APP_ReactUrl}/register`, {
        name,
        username,
        password,
      });
      console.log(response.data); // Handle success response
      setSucess(response.data)
      
        setTimeout(()=>{
          navigate('/')
        },2000)
  
      
    } catch (error) {
      console.error('Error registering user:', error); // Handle error
    }
  };

  return (
    <div className='registerform'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        
        <input className="register-input" required type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>        
        <input className="register-input" required type="text" placeholder='UserName' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input className="register-input" required type="password" placeholder='Password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
        

        <button className='register-button' type="submit">Register</button>
      </form>
      {sucess && <SucessMessage message={sucess} />}
    </div>
  );
};

export default RegistrationForm;
