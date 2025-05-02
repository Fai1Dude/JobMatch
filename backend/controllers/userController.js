const User = require('../models/User');
const mongoose = require('mongoose');

const userController = {
  getUserById: async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }

      const user = await User.findById(req.params.id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        userType: user.userType,
        profile: {
          firstName: user.profile.firstName,
          lastName: user.profile.lastName,
          phone: user.profile.phone,
          company: user.profile.company,
          position: user.profile.position,
          skills: user.profile.skills || [],
          experience: user.profile.experience || []
        },
        preferences: user.preferences || {
          region: 'SA',
          darkMode: false,
          followedCompanies: []
        },
        notifications: user.notifications || []
      });

    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user data', error: error.message });
    }
  },

  updatePreferences: async (req, res) => {
    try {
      const { id } = req.params;
      const { region, darkMode } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }

      const updateData = {};
      if (region) updateData['preferences.region'] = region;
      if (darkMode !== undefined) updateData['preferences.darkMode'] = darkMode;

      const user = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.preferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ message: 'Failed to update preferences', error: error.message });
    }
  },

  getNotifications: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }

      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
    }
  },

  markNotificationAsRead: async (req, res) => {
    try {
      const { userId, notificationId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }

      const user = await User.findOneAndUpdate(
        { 
          _id: userId,
          'notifications._id': notificationId 
        },
        { 
          $set: { 'notifications.$.isRead': true }
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User or notification not found' });
      }

      res.json({ message: 'Notification marked as read' });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
    }
  },

  // Helper method to add notifications (can be called from other parts of your application)
  addNotification: async (userId, notification) => {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { 
          $push: { 
            notifications: {
              ...notification,
              createdAt: new Date()
            }
          }
        },
        { new: true }
      );

      return user ? user.notifications : null;
    } catch (error) {
      console.error('Error adding notification:', error);
      return null;
    }
  }
};

module.exports = userController;