// src/components/Register/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../assets/logo.png';

function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: User Type, Step 2: Details
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: '',
    profile: {
      firstName: '',
      lastName: '',
      phone: '',
      about: '',
      skills: '',
      languages: '',
      location: '',
      education: {
        degree: '',
        school: '',
        year: '',
        description: ''
      },
      experience: []
    }
  });
  const [error, setError] = useState('');

  const handleUserTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      userType: type
    }));
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Handle nested profile fields
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      // Format the data before sending
      const formattedData = {
        ...formData,
        profile: {
          ...formData.profile,
          skills: formData.profile.skills ? formData.profile.skills.split(',').map(skill => skill.trim()) : [],
          languages: formData.profile.languages ? formData.profile.languages.split(',').map(lang => lang.trim()) : [],
          // Ensure education is properly formatted as an object
          education: {
            degree: formData.profile.education?.degree || '',
            school: formData.profile.education?.school || '',
            year: formData.profile.education?.year || '',
            description: formData.profile.education?.description || ''
          }
        }
      };

      console.log('Sending data:', formattedData); // Debug log

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('userId', data.userId);
        navigate('/login');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Server error. Please try again.');
      console.error('Registration error:', error);
    }
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => {
      const newExperience = [...prev.profile.experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value
      };
      return {
        ...prev,
        profile: {
          ...prev.profile,
          experience: newExperience
        }
      };
    });
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        experience: [
          ...prev.profile.experience,
          { title: '', company: '', years: '', description: '' }
        ]
      }
    }));
  };

  if (step === 1) {
    return (
      <div className="register-container">
        <div className="logo">
          <img src={logo} alt="JobMatch Logo" className="logo-register" />
        </div>
        <h2>Choose Account Type</h2>
        <div className="user-type-selection">
          <button 
            className="user-type-button"
            onClick={() => handleUserTypeSelect('jobseeker')}
          >
            Job Seeker
          </button>
          <button 
            className="user-type-button"
            onClick={() => handleUserTypeSelect('employee')}
          >
            Employee
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="logo">
        <img src={logo} alt="JobMatch Logo" className="logo-register" />
      </div>
      <h2>Complete Your Profile</h2>
      <form className="register-form" onSubmit={handleRegister}>
        {/* Basic Information - Always shown */}
        <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <input 
          type="text"
          name="profile.firstName"
          placeholder="First Name"
          value={formData.profile.firstName}
          onChange={handleChange}
          required 
        />
        <input 
          type="text"
          name="profile.lastName"
          placeholder="Last Name"
          value={formData.profile.lastName}
          onChange={handleChange}
          required 
        />
        <input 
          type="tel"
          name="profile.phone"
          placeholder="Phone Number"
          value={formData.profile.phone}
          onChange={handleChange}
          required 
        />

        {/* Job Seeker Specific Fields */}
        {formData.userType === 'jobseeker' && (
          <>
            <textarea
              name="profile.about"
              placeholder="About yourself"
              value={formData.profile.about}
              onChange={handleChange}
            />
            <input
              type="text"
              name="profile.skills"
              placeholder="Skills (comma-separated)"
              value={formData.profile.skills}
              onChange={handleChange}
            />
            <input
              type="text"
              name="profile.languages"
              placeholder="Languages (comma-separated)"
              value={formData.profile.languages}
              onChange={handleChange}
            />
            <input
              type="text"
              name="profile.location"
              placeholder="Location"
              value={formData.profile.location}
              onChange={handleChange}
            />

            {/* Single Education Section */}
            <h3>Education</h3>
            <div className="education-entry">
              <input
                type="text"
                name="profile.education.degree"
                placeholder="Degree"
                value={formData.profile.education.degree}
                onChange={handleChange}
              />
              <input
                type="text"
                name="profile.education.school"
                placeholder="School"
                value={formData.profile.education.school}
                onChange={handleChange}
              />
              <input
                type="text"
                name="profile.education.year"
                placeholder="Year"
                value={formData.profile.education.year}
                onChange={handleChange}
              />
              <textarea
                name="profile.education.description"
                placeholder="Description"
                value={formData.profile.education.description}
                onChange={handleChange}
              />
            </div>

            {/* Experience Section */}
            <h3>Experience</h3>
            {formData.profile.experience.map((exp, index) => (
              <div key={index} className="experience-entry">
                <input
                  type="text"
                  name={`profile.experience[${index}].title`}
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                />
                <input
                  type="text"
                  name={`profile.experience[${index}].company`}
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                />
                <input
                  type="number"
                  name={`profile.experience[${index}].years`}
                  placeholder="Years"
                  value={exp.years}
                  onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                />
                <textarea
                  name={`profile.experience[${index}].description`}
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddExperience}>Add Experience</button>
          </>
        )}

        {/* Employee Specific Fields */}
        {formData.userType === 'employee' && (
          <>
            <input
              type="text"
              name="profile.company"
              placeholder="Company Name"
              value={formData.profile.company}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="profile.position"
              placeholder="Position"
              value={formData.profile.position}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="profile.department"
              placeholder="Department"
              value={formData.profile.department}
              onChange={handleChange}
            />
          </>
        )}

        {error && <p className="error-message">{error}</p>}
        
        <div className="button-group">
          <button type="button" className="cancel-button" onClick={() => setStep(1)}>
            Back
          </button>
          <button type="submit" className="signup-button">Sign Up</button>
        </div>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Register;
