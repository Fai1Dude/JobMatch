const express = require('express');
const router = express.Router();
const jobSeekerController = require('../controllers/jobSeekerController');

// GET route to fetch a specific job seeker by ID
router.get('/:id', jobSeekerController.getJobSeekerById);

module.exports = router; 