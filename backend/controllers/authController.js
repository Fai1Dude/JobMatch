const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
  register: async (req, res) => {
    try {
      const { email, password, userType, profile } = req.body;

      // Validate userType
      const validUserTypes = ['admin', 'employee', 'jobseeker'];
      if (!validUserTypes.includes(userType)) {
        return res.status(400).json({ message: 'Invalid user type. Must be admin, employee, or jobseeker' });
      }

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const user = new User({
        email,
        password,
        userType,
        profile
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        message: 'Registration successful',
        token,
        userType: user.userType,
        userId: user._id
      });

    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user and explicitly select the userType field
      const user = await User.findOne({ email }).select('+userType +password');
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Add console.log to debug
      console.log('User found:', {
        email: user.email,
        userType: user.userType
      });

      // Create token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        token,
        userType: user.userType,
        userId: user._id
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = authController;