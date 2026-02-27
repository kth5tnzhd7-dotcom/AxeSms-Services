import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import { db } from '../db.js';

const router = express.Router();

// GET current user profile
router.get('/profile', verifyToken, (req, res) => {
  try {
    const user = db.users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      balance: user.balance,
      verified: user.verified,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// GET user transactions
router.get('/transactions', verifyToken, (req, res) => {
  try {
    const userTransactions = db.transactions.filter((t) => t.userId === req.user.id);
    res.json({ transactions: userTransactions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// GET user campaigns
router.get('/campaigns', verifyToken, (req, res) => {
  try {
    const userCampaigns = db.campaigns.filter((c) => c.userId === req.user.id);
    res.json({ campaigns: userCampaigns });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// UPDATE user profile
router.put('/profile', verifyToken, (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = db.users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    res.json({
      success: true,
      message: 'Profile updated',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        balance: user.balance,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET all users (ADMIN ONLY)
router.get('/admin/users', verifyAdmin, (req, res) => {
  try {
    const users = db.users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone,
      role: u.role,
      balance: u.balance,
      verified: u.verified,
      createdAt: u.createdAt,
    }));
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET all transactions (ADMIN ONLY)
router.get('/admin/transactions', verifyAdmin, (req, res) => {
  try {
    res.json({ transactions: db.transactions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
