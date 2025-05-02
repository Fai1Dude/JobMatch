const Job = require('../models/Job');
const User = require('../models/User');
const userController = require('./userController');

const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();

    // Find all jobseekers to notify them about the new job
    const jobseekers = await User.find({ userType: 'jobseeker' });

    // Create notification for each jobseeker
    const notificationPromises = jobseekers.map(user => {
      const notification = {
        title: 'New Job Posted',
        message: `New job opportunity: ${job.title} at ${job.companyName}`,
        type: 'job',
        link: `/job/${job._id}`, // Frontend route to view the job
        isRead: false
      };
      return userController.addNotification(user._id, notification);
    });

    await Promise.all(notificationPromises);

    res.status(201).json({ message: 'Job post created successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all job posts
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update job post
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: 'Job post updated successfully', updatedJob });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createJob,
  getAllJobs,  // Make sure this is exported
  updateJob
};