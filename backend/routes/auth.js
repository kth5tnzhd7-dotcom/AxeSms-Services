import express from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js';

const router = express.Router();

// Helper function to find user
const findUser = (email) => db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// LOGIN
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = findUser(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Simple password check (in production, use bcrypt)
    const isValidPassword = password === 'admin@123' && email === 'admin@axesms.services'
      || password === 'demo@123' && email === 'demo@axesms.services';

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        balance: user.balance,
        phone: user.phone,
        verified: user.verified,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// SIGNUP
router.post('/signup', (req, res) => {
  try {
    const { email, name, phone, password, confirmPassword } = req.body;

    if (!email || !name || !phone || !password) {
      return res.status(400).json({ error: 'All fields required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (findUser(email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newUser = {
      id: 'user_' + uuidv4(),
      email: email.toLowerCase(),
      name,
      phone,
      password, // In production, hash with bcrypt
      role: 'user',
      balance: 50,
      createdAt: new Date(),
      verified: false,
    };

    db.users.push(newUser);
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        balance: newUser.balance,
        phone: newUser.phone,
        verified: newUser.verified,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// LOGOUT (optional - mainly for frontend)
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
