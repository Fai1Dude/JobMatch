import React from 'react';
import { FaArchive } from 'react-icons/fa'; // Existing icons
import { RxDashboard } from 'react-icons/rx';
import { MdMessage, MdOutlineTouchApp } from 'react-icons/md';
import { ImExit } from 'react-icons/im'; // Import the new exit icon
import './Sidebar.css';

const Sidebar = ({ userType }) => {
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
};

export default Sidebar;

  