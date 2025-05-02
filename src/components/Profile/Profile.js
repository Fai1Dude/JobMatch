import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import Banner from '../../assets/banner.png';
import GoogleLogo from '../../assets/google.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get userId from localStorage if not provided in URL params
  const { id } = useParams();
  const userId = id || localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Add console.log to debug
        console.log('Fetching profile for userId:', userId);
        
        if (!userId) {
          throw new Error('No user ID available');
        }

        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>User Activity</h1>
      </div>

      <div className="banner-container">
        <img src={Banner} alt="Company banner" className="banner-image" />
      </div>

      <div className="company-info-section">
        <div className="company-header">
          <img src={GoogleLogo} alt="Google Inc." className="company-logo" />
          <div className="company-details">
            <h2>{user.profile?.firstName} {user.profile?.lastName}</h2>
            <p className="location">📍 {user.profile?.location || 'SA'}</p>
          </div>
        </div>

        {/* Only render stats section if stats array exists */}
        {user.stats && Array.isArray(user.stats) && (
          <div className="stats-grid">
            {user.stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-title">{stat.title}</div>
                <div className="stat-content">
                  <span className="stat-value">{stat.value}</span>
                  <div className={`stat-trend ${stat.trend}`}>
                    <span className="trend-graph">
                      {stat.trend === 'up' ? '📈' : '📉'}
                    </span>
                    <span className="trend-value">{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="company-description">
          <div className="description-section">
            <h3>About</h3>
            <p>{user.profile?.about || '....'}</p>
          </div>
          <div className="description-section">
            <h3>Vision</h3>
            <p>{user.profile?.vision || '....'}</p>
          </div>
          <div className="description-section">
            <h3>Goals</h3>
            <p>{user.profile?.goals || '....'}</p>
          </div>
          <div className="description-section">
            <h3>Experiences</h3>
            <p>{user.profile?.experiences || '....'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
