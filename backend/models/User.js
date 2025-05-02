const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  userType: {
    type: String,
    required: true,
    enum: ['admin', 'employee', 'jobseeker']
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    about: String,
    skills: [String],
    languages: [String],
    location: String,
    company: String,
    position: String,
    education: {
      degree: String,
      school: String,
      year: String,
      description: String
    },
    experience: [{
      title: String,
      company: String,
      years: Number,
      description: String
    }]
  },
  preferences: {
    region: {
      type: String,
      enum: ['SA', 'UK', 'USA'],
      default: 'SA'
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    followedCompanies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  notifications: [{
    title: String,
    message: String,
    type: {
      type: String,
      enum: ['job', 'interview', 'application'],
    },
    isRead: {
      type: Boolean,
      default: false
    },
    link: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);