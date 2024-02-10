// src/components/AuthForm.js
import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ title, endpoint, onToggle, navigate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(endpoint, {
        username,
        password,
      });

      // Handle successful response
      console.log("API Response:", response.data);
      navigate("/dashboard"); // Redirect to dashboard or any other route after successful login/register
    } catch (error) {
      // Handle error
      console.error("API Error:", error.message);
      setError("Invalid credentials. Please try again."); // Update error state
    }
  };

  return (
    <div className="form-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">{title}</button>
      </form>
      <p onClick={onToggle}>
        {title === "Login"
          ? "Don’t have an account? Register here."
          : "Already have an account? Login here."}
      </p>
    </div>
  );
};

export default AuthForm;
