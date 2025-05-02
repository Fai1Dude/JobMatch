// SystemPerformance.js
// SystemPerformance.js
import React from 'react';
import './SystemPerformance.css';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import Banner from '../../assets/banner.png';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Sample data for Application Usage (Doughnut chart)
const applicationUsageData = {
  datasets: [
    {
      data: [42, 8, 50],
      backgroundColor: ['#4B5563', '#FB923C', '#8B5CF6'],
    },
  ],
  labels: ['Employers', 'Admins', 'Job Seekers'],
};

// Sample data for Application Activity (Line chart) with more x-axis points
const applicationActivityData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
  datasets: [
    {
      label: 'Last Month',
      data: [300, 250, 400, 430, 470, 420, 500, 540],
      borderColor: '#3B82F6',
      fill: false,
    },
    {
      label: 'This Month',
      data: [320, 280, 450, 521, 490, 530, 600, 620],
      borderColor: '#10B981',
      fill: false,
    },
  ],
};

// Sample data for Most Applications Applied (Progress bars)
const mostApplications = [
  { name: 'The Guy', percentage: 45 },
  { name: 'Abo Saqer', percentage: 29 },
  { name: 'Agent X', percentage: 18 },
  { name: 'Dude', percentage: 25 },
];

const SystemPerformance = () => {
  return (
    // <Layout> {/* Wrap the main content in Layout to include Header and Sidebar */}
      <div className="system-performance">
        {/* Banner Section */}
        <div className="banner-container">
          <img src={Banner} alt="Banner" className="banner-image" />
        </div>

        {/* Main Content Section */}
        <div className="performance-grid">
          {/* Application Usage Section */}
          <div className="performance-section application-usage-section">
            <h2 className="section-title">
              Application Usage <span className="download-report">Download Report</span>
            </h2>
            <div className="application-usage">
              <Doughnut data={applicationUsageData} />
              <div className="usage-stats">
                <div className="stat-item">
                  <span className="stat-indicator employers"></span>
                  <p className="stat-label">Employers</p>
                  <p className="stat-number">42</p>
                </div>
                <div className="stat-item">
                  <span className="stat-indicator admins"></span>
                  <p className="stat-label">Admins</p>
                  <p className="stat-number">8</p>
                </div>
                <div className="stat-item">
                  <span className="stat-indicator job-seekers"></span>
                  <p className="stat-label">Job Seekers</p>
                  <p className="stat-number">50</p>
                </div>
              </div>
            </div>
          </div>

          {/* Most Applications Applied Section */}
          <div className="performance-section most-applications-section">
            <h2 className="section-title">Most Applications Applied</h2>
            <ul className="applications-list">
              {mostApplications.map((app, index) => (
                <li key={index} className="application-item">
                  <span className="applicant-name">{app.name}</span>
                  <div className="application-progress">
                    <div className="progress-bar" style={{ width: `${app.percentage}%` }}></div>
                    <span className="progress-percent">{app.percentage}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Application Activity Section */}
          <div className="performance-section application-activity-section">
            <h2 className="section-title">Application Activity</h2>
            <Line data={applicationActivityData} />
          </div>
        </div>
      </div>
    // </Layout>
  );
};

export default SystemPerformance;
