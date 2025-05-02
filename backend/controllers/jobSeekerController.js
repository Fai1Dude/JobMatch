const User = require('../models/User');

const jobSeekerController = {
  getJobSeekerById: async (req, res) => {
    try {
      const jobSeeker = await User.findOne({ 
        _id: req.params.id,
        userType: 'jobseeker'
      });

      if (!jobSeeker) {
        return res.status(404).json({ message: 'Job seeker not found' });
      }

      // Log the data being sent for debugging
      console.log('Fetched job seeker:', jobSeeker);

      res.json({
        profile: {
          firstName: jobSeeker.profile.firstName,
          lastName: jobSeeker.profile.lastName,
          bio: jobSeeker.profile.bio || '',
          skills: jobSeeker.profile.skills || [],
          languages: jobSeeker.profile.languages || [],
          studies: jobSeeker.profile.studies || []
        },
        experiences: jobSeeker.experiences || [],
        // Add any other necessary fields
      });

    } catch (error) {
      console.error('Error fetching job seeker:', error);
      res.status(500).json({ message: 'Failed to fetch job seeker data' });
    }
  }
};

module.exports = jobSeekerController; 