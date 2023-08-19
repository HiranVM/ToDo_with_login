import React from 'react'
import  './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { register } from '../../redux/authSlice'
import {useDispatch} from 'react-redux'
import axios from 'axios'

//backend 
const baseUrl = "http://localhost:5000";

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
     e.preventDefault()

     if(username === '' || email === '' || password === '') return

    try {
      
      const data = await axios.post(`${baseUrl}/auth/register`,  {username, email, password})
      if(data.error){
        console.log("error ind");
        setErrorMessage(data.error); // Set the error message if the user does not exist
      }else{
        dispatch(register(data))
      navigate("/")
      }
      
    } catch (error) {
       console.error(error)
    }
  }

  return (
    <div className='container'>
      <div className='wrapper'>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)}/>
          <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Register</button>
          <p>Already have an account? <Link to='/login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Register