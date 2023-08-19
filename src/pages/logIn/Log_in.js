import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import axios from 'axios';

//backend 
const baseUrl = "http://localhost:5000";

const Log_in = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    try {

      const data = await axios.post(`${baseUrl}/auth/login`, { email, password });
      if (data.error) {
        console.log("error ind");
        setErrorMessage(data.error); // Set the error message if the user does not exist
      } else {
        console.log("e illa");
        console.log(data.data);
        dispatch(login(data.data));

        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <div className='wrapper'>
        <h2>Login</h2>
        {errorMessage && <p className='error'>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Log_in;
