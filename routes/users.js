
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
  // In a real app, you would want to hash the password
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar
  });

  try {
    const newUser = await user.save();
    res.status(201).json({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    
    // In a real app, you would want to check the hashed password
    if (req.body.password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user profile
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
