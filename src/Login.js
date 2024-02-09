import React, {
  useState
} from 'react';
import './styles.css';
import {
  Link,
  useNavigate
} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (response.ok) {
        const {
          access_token
        } = await response.json();
        localStorage.setItem('access_token', access_token);

        navigate('/home');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return ( <
    div className = "login-container" >
    <
    h2 > Login < /h2> <
    nav >
    <
    span > < /span> <
    Link to = "/register" > Don 't have an account? Register</Link> <
    /nav> <
    form className = 'login-container'
    onSubmit = {
      handleSubmit
    } >
    <
    input type = "text"
    placeholder = "Email"
    value = {
      email
    }
    onChange = {
      (e) => setEmail(e.target.value)
    }
    /> <
    input type = "password"
    placeholder = "Password"
    value = {
      password
    }
    onChange = {
      (e) => setPassword(e.target.value)
    }
    /> <
    button type = "submit" > Login < /button> <
    /form> <
    /div>
  );
};

export default Login;