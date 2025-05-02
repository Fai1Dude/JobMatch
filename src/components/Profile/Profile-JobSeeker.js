import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile-JobSeeker.css';
import Banner from '../../assets/banner.png';
import DefaultAvatar from '../../assets/banner.png';

const ProfileJobSeeker = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    profile: {
      firstName: '',
      lastName: '',
      location: '',
      about: '',
      skills: [],
      experience: [],
      education: []
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message);
        }
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-jobseeker">
      <div className="profile-header">
        <h1>User Profile</h1>
      </div>

      <div className="banner-container">
        <img src={Banner} alt="Profile banner" className="banner-image" />
      </div>

      <div className="profile-info-section">
        <div className="profile-header">
          <img 
            src={user.profile?.avatar || DefaultAvatar} 
            alt="Profile" 
            className="profile-avatar" 
          />
          <div className="profile-details">
            <h2>{user.profile?.firstName} {user.profile?.lastName}</h2>
            <p className="location">� {user.profile?.location || 'SA'}</p>
          </div>
        </div>

        <div className="profile-description">
          {/* About Section */}
          <div className="description-section">
            <h3>About</h3>
            <p>{user.profile?.about || 'No information provided'}</p>
          </div>

          {/* Skills Section */}
          {user.profile?.skills && user.profile.skills.length > 0 && (
            <div className="description-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {user.profile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          {user.profile?.experience && user.profile.experience.length > 0 && (
            <div className="description-section">
              <h3>Experience</h3>
              {user.profile.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h4>{exp.title}</h4>
                  <p>{exp.company}</p>
                  <p>{exp.years} years</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {user.profile?.education && user.profile.education.length > 0 && (
            <div className="description-section">
              <h3>Education</h3>
              {user.profile.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h4>{edu.degree}</h4>
                  <p>{edu.school}</p>
                  <p>{edu.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileJobSeeker;