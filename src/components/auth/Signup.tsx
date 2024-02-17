// Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Corrected import
import './Signup.css'; // Import the CSS file

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-6xa4.onrender.com/auth/signup', {
        email,
        password,
      });
      // Handle successful signup (e.g., redirect to signin page)
      console.log(response);
      navigate("/home"); // Corrected redirection method
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  const handleSignIn = () => {
    navigate('/'); // Assuming '/signup' is the route for the sign-up page
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
      {/* Add a Sign Up button */}
      <button type="button" onClick={handleSignIn}>Got a account ? Sign In</button>
    </form>
  );
};

export default Signup;
