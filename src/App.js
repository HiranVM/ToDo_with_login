import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home';
import Log_in from './pages/logIn/Log_in';
import Register from './pages/register/Register';
import { useSelector } from 'react-redux';


function App() {
  const { user } = useSelector((state) => state.auth)

  return (
    <div>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Log_in /> : <Navigate to='/' />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />

      </Routes>
    </div>
  );
}

export default App