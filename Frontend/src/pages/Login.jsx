import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    if(!email || !password){
      setError('Please fill both fields')
      return
    }

    fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(async res => {
      const data = await res.json()
      if(!res.ok) return setError(data.message || 'Login failed')
      // Save user to localStorage and navigate home
      if(data.user) localStorage.setItem('user', JSON.stringify(data.user))
      navigate('/')
    }).catch(err => {
      console.error(err)
      setError('Network error')
    })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary" type="submit">Login</button>
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
