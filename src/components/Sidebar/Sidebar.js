// Sidebar.js
import React from 'react';
import { RxDashboard } from 'react-icons/rx';
import { FaArchive, FaChartLine } from 'react-icons/fa';
import { MdPersonOutline, MdMessage, MdOutlineTouchApp } from 'react-icons/md';
import { ImExit } from 'react-icons/im';
import './Sidebar.css';

const Sidebar = ({ userType }) => {
  const renderSidebarContent = () => {
    switch (userType) {
      case 'admin':
        return (
          <div className="sidebar">
            
            <ul className="nav-links">
              <li>
                <a href="/ADashboardContent">
                  <RxDashboard className="nav-icon" /> Dashboard
                </a>
              </li>
              <li>
                <a href="/JobPostingAdmin">
                  <FaArchive className="nav-icon" /> Job Posting
                </a>
              </li>
              <li>
                <a href="/UserActivity">
                  <MdPersonOutline className="nav-icon" /> User Activity
                </a>
              </li>
              <li>
                <a href="/SystemPerformance">
                  <FaChartLine className="nav-icon" /> System Performance
                </a>
              </li>
              <li>
                <a href="/Login" className="sign-out">
                  <ImExit className="nav-icon" /> Sign Out
                </a>
              </li>
            </ul>
          </div>

        );

      case 'jobseeker':
        return (
          <div className="sidebar">
            <ul className="nav-links">
              <li>
                <a href="/JBDashboardContent">
                  <RxDashboard className="nav-icon" /> Dashboard
                </a>
              </li>
              <li>
                <a href="/SavedJobs">
                  <FaArchive className="nav-icon" /> Saved Jobs
                </a>
              </li>
              <li>
                <a href="/MessageJobSeekers">
                  <MdMessage className="nav-icon" /> Messages
                </a>
              </li>
              <li>
                <a href="/ApplicationJobseekers">
                  <MdOutlineTouchApp className="nav-icon" /> Application
                </a>
              </li>
              <li>
                <a href="/Login" className="sign-out">
                  <ImExit className="nav-icon" /> Sign Out
                </a>
              </li>
            </ul>
          </div>
        );

      case 'employee':
        return (
          <div className="sidebar">
            <ul className="nav-links">
              <li>
                <a href="/EDashboardContent">
                  <RxDashboard className="nav-icon" /> Dashboard
                </a>
              </li>
              <li>
                <a href="/JobPosting">
                  <FaArchive className="nav-icon" /> Job Posting
                </a>
              </li>
              <li>
                <a href="/MessageEmployers">
                  <MdMessage className="nav-icon" /> Messages
                </a>
              </li>
              <li>
                <a href="/ApplicationEmployers">
                  <MdOutlineTouchApp className="nav-icon" /> Applications
                </a>
              </li>
              <li>
                <a href="/Login" className="sign-out">
                  <ImExit className="nav-icon" /> Sign Out
                </a>
              </li>
            </ul>
          </div>
        );

      default:
        return null; // Return nothing if userType does not match any case
    }
  };

  return renderSidebarContent();
};

export default Sidebar;
