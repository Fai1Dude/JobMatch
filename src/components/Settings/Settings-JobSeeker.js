// Settings-JobSeeker.js
import React, { useState } from 'react';
import './Settings-JobSeeker.css';
import Banner from '../../assets/banner.png';
import { useLocation } from 'react-router-dom';

const SettingsJobSeeker = () => {
  const location = useLocation();
  const userType = location?.state?.userType || 'jobseeker';
  const [activeTab, setActiveTab] = useState('My details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'My details':
        return (
          <div className="tab-content">
            <div className="form-row">
              <label className="form-label">First name</label>
              <input type="text" className="form-input" placeholder="Enter your first name" />
              <label className="form-label">Last name</label>
              <input type="text" className="form-input" placeholder="Enter your last name" />
            </div>
            <div className="form-row">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="Enter your email" />
            </div>
            <div className="form-row">
              <label className="form-label">CV</label>
              <div className="upload-container">
                <p>Click to upload or drag and drop</p>
                <p>SVG, PNG, JPG, or GIF (max, 800x400px)</p>
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">Role</label>
              <input type="text" className="form-input" placeholder="Enter your role" />
            </div>
            <div className="action-buttons">
              <button className="cancel-button">Cancel</button>
              <button className="save-button">Save</button>
            </div>
          </div>
        );
      case 'Profile':
        return (
          <div className="tab-content">
            <h3>Change Profile Photo</h3>
            <div className="upload-container">
              <p>Click to upload or drag and drop</p>
              <p>SVG, PNG, JPG, or GIF (max, 800x400px)</p>
            </div>
          </div>
        );
      case 'Password':
        return (
          <div className="tab-content">
            <h3>Change Password</h3>
            <div className="form-row">
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" placeholder="Enter new password" />
            </div>
            <div className="form-row">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-input" placeholder="Confirm new password" />
            </div>
            <button className="save-button">Update Password</button>
          </div>
        );
      case 'Team':
        return (
          <div className="tab-content">
            <h3>Teams</h3>
            <ul>
              <li>Team A - Role: Developer</li>
              <li>Team B - Role: Designer</li>
            </ul>
          </div>
        );
      case 'Plan':
        return (
          <div className="tab-content">
            <h3>Subscription Plan</h3>
            <p>Plan Type: Premium</p>
            <p>Billing Cycle: Monthly</p>
          </div>
        );
      case 'Billing':
        return (
          <div className="tab-content">
            <h3>Payment Methods</h3>
            <ul>
              <li>Visa - **** **** **** 1234</li>
              <li>Mastercard - **** **** **** 5678</li>
            </ul>
          </div>
        );
      default:
        return <p>Select a tab to view details.</p>;
    }
  };

  return (
    <div className="settings-page">
      <div className="banner-container">
        <img src={Banner} alt="Banner" className="banner-image" />
        <div className="profile-image-container">
          <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80" alt="Profile" className="profile-image" />
        </div>
      </div>

      <div className="tabs">
        <button onClick={() => setActiveTab('My details')} className={`tab-button ${activeTab === 'My details' ? 'active-tab' : ''}`}>My details</button>
        <button onClick={() => setActiveTab('Profile')} className={`tab-button ${activeTab === 'Profile' ? 'active-tab' : ''}`}>Profile</button>
        <button onClick={() => setActiveTab('Password')} className={`tab-button ${activeTab === 'Password' ? 'active-tab' : ''}`}>Password</button>
        <button onClick={() => setActiveTab('Team')} className={`tab-button ${activeTab === 'Team' ? 'active-tab' : ''}`}>Team</button>
        <button onClick={() => setActiveTab('Plan')} className={`tab-button ${activeTab === 'Plan' ? 'active-tab' : ''}`}>Plan</button>
        <button onClick={() => setActiveTab('Billing')} className={`tab-button ${activeTab === 'Billing' ? 'active-tab' : ''}`}>Billing</button>
      </div>

      <div className="content-section">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SettingsJobSeeker;
