const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try{
    const { name, email, password } = req.body
    if(!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })

    const existing = await User.findOne({ email })
    if(existing) return res.status(409).json({ message: 'User already exists' })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = new User({ name, email, password: hash })
    await user.save()
    return res.status(201).json({ message: 'User created' })
  }catch(err){
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({ message: 'Missing fields' })

    const user = await User.findOne({ email })
    if(!user) return res.status(401).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    // For simplicity, return minimal user info. Add JWT/session in future.
    return res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } })
  }catch(err){
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router
