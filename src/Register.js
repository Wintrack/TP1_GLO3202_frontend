import React, { useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      console.log(apiUrl)
      console.log(JSON.stringify({ email, password }))
      const data = await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
    <h2>Register</h2>
    <nav>
      <Link to="/">Already have an account? Login</Link>
      <span></span>
    </nav>
    <form className="register-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
    </div>
  );
};

export default Register;
