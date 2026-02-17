import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

function Home(){
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  function handleLogout(){
    localStorage.removeItem('user')
    // reload to update UI quickly
    window.location.reload()
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Job Portal</h1>
      {!user ? (
        <>
          <p>Simple demo of Login and Signup pages using React + Bootstrap.</p>
          <p>
            <Link to="/login" className="btn btn-primary me-2">Login</Link>
            <Link to="/signup" className="btn btn-outline-primary">Sign Up</Link>
          </p>
        </>
      ) : (
        <>
          <div className="alert alert-success">Welcome, <strong>{user.name}</strong>!</div>
          <p>
            <button className="btn btn-secondary me-2" onClick={handleLogout}>Logout</button>
          </p>
        </>
      )}
    </div>
  )
}

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}
