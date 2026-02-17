import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    setError('')
    if(!name || !email || !password){
      setError('Please fill all fields')
      return
    }
    fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    }).then(async res => {
      const data = await res.json()
      if(!res.ok) return setError(data.message || 'Signup failed')
      // On success navigate to login
      navigate('/login')
    }).catch(err => {
      console.error(err)
      setError('Network error')
    })
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button className="btn btn-primary" type="submit">Create account</button>
              <Link to="/login">Already have an account? Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
