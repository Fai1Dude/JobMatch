const express = require('express');
const router = express.Router();
const { createJob } = require('../controllers/jobController');

// Create Job Post route
router.post('/create', createJob);

module.exports = router; 