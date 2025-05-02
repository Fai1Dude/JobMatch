import React from 'react';
import { FaArchive } from 'react-icons/fa'; // Existing icons
import { RxDashboard } from 'react-icons/rx';
import { MdMessage, MdOutlineTouchApp } from 'react-icons/md';
import { ImExit } from 'react-icons/im'; // Import the new exit icon
import { MdPersonOutline } from 'react-icons/md';
import { FaChartLine } from 'react-icons/fa';


import './Sidebar.css';

const Sidebar = ({ userType }) => {
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
};

export default Sidebar;

  