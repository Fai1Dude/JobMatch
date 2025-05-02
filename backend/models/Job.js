const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  companyName: String,
  jobLocation: String,
  jobInfo: String,
  orgInfo: String,
  connections: String,
  skills: String,
  description: String,
  requirements: String,
  instructions: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', jobSchema); 