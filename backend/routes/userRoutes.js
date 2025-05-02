const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Existing routes
router.get('/:id', userController.getUserById);

// New routes for preferences and notifications
router.put('/:id/preferences', userController.updatePreferences);
router.get('/:id/notifications', userController.getNotifications);
router.put('/:id/notifications/:notificationId/read', userController.markNotificationAsRead);

module.exports = router;