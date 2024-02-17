// Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ApiInfoBox from '../apiInfo/ApiInfo'; // Import the new component
import './Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-6xa4.onrender.com/auth/signup', {
        email,
        password,
      });
      console.log(response);
      navigate("/home");
    } catch (error) {
      // Handle error
    }
  };

  const handleSignIn = () => {
    navigate('/');
  };

  return (
    <div>
      <ApiInfoBox />
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleSignIn}>Got an account? Sign In</button>
      </form>
    </div>
  );
};

export default Signup;
