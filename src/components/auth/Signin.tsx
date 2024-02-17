// Signin.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext'; // Import the AuthContext hook
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
      localStorage.setItem('access_token', access_token);
      loginUser(); // Call the login function from the AuthContext
      navigate('/home');
    } catch (error) {
      // Handle error
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
      <button type="button" onClick={handleSignUp}>New here? Sign Up</button>
    </form>
  );
};

export default Signin;
