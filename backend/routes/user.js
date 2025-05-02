const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all employers
router.get('/employers', async (req, res) => {
  try {
    const employers = await User.find({ userType: 'employer' });
    res.json(employers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all job seekers
router.get('/jobseekers', async (req, res) => {
  try {
    const jobseekers = await User.find({ userType: 'jobseeker' }).select('profile.firstName profile.lastName email');
    res.json(jobseekers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await User.find({ userType: 'employee' }).select('profile.firstName profile.lastName email');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await User.find({ userType: 'admin' }).select('profile.firstName profile.lastName email');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this route to check user details
router.get('/check/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.json({
        email: user.email,
        userType: user.userType
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 