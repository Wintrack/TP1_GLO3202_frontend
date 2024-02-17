// Import necessary dependencies
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import ApiInfoBox from '../apiInfo/ApiInfo'; // Import the new component
import './Signin.css';

const Signin: React.FC = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-6xa4.onrender.com/auth/signin', {
        email,
        password,
      });
      console.log(response);
      
      const { access_token } = response.data;

      // Use both local storage and cookies
      localStorage.setItem('access_token', access_token);
      document.cookie = `access_token=${access_token}; Secure; SameSite=Strict`;

      loginUser();
      navigate('/home');
    } catch (error) {
      // Handle error
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div>
      <ApiInfoBox />
      <form className="signin-form" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign In</button>
        <button type="button" onClick={handleSignUp}>New here? Sign Up</button>
      </form>
    </div>
  );
};

export default Signin;
