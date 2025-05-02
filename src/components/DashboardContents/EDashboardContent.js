import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './DashboardContent.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardContent = () => {
  const [activeFilter, setActiveFilter] = useState('Today');

  const jobData = {
    Monthly: [
      { title: 'UI UX Designer', category: 'Full Time', openings: 12, applications: 135, status: 'Active' },
      { title: 'Full Stack Dev', category: 'Full Time', openings: 8, applications: 100, status: 'Inactive' },
      { title: 'DevOps', category: 'Internship', openings: 12, applications: 5, status: 'Active' },
      { title: 'Android Dev', category: 'Full Time', openings: 4, applications: 45, status: 'Active' },
      { title: 'IOS Developer', category: 'Full Time', openings: 18, applications: 96, status: 'Inactive' }
    ],
    Weekly: [
      { title: 'Data Scientist', category: 'Contract', openings: 5, applications: 50, status: 'Active' },
      { title: 'Backend Developer', category: 'Part Time', openings: 3, applications: 30, status: 'Inactive' }
    ],
    Today: [
      { title: 'Product Manager', category: 'Full Time', openings: 10, applications: 200, status: 'Active' },
      { title: 'System Analyst', category: 'Full Time', openings: 6, applications: 75, status: 'Inactive' }
    ]
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const chartData = {
    labels: ['Unemployed', 'Employed', 'Trainee'],
    datasets: [
      {
        data: [42, 8, 50],
        backgroundColor: ['#4e73df', '#1cc88a', '#e74a3b'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#e74a3b'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    aspectRatio: 2,
    maintainAspectRatio: false,
  };

  const handleDownload = () => {
    const dataToDownload = {
      labels: chartData.labels,
      datasets: chartData.datasets[0].data,
    };
    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-content">
      {/* Metrics Section */}
      <div className="metrics">
        <div className="metric-card">
          <h3>Job Postings</h3>
          <p>200</p>
          <span className="change positive">+2.5%</span>
        </div>
        <div className="metric-card">
          <h3>Total Applications</h3>
          <p>100</p>
          <span className="change negative">-4.4%</span>
        </div>
        <div className="metric-card">
          <h3>No of Meetings</h3>
          <p>50</p>
          <span className="change positive">+1.5%</span>
        </div>
        <div className="metric-card">
          <h3>No of Hirings</h3>
          <p>8</p>
          <span className="change positive">+4.5%</span>
        </div>
      </div>

      {/* Application Response Chart */}
      <div className="charts-section">
        <div className="chart">
          <h3>Application Response</h3>
          <button className="download-report" onClick={handleDownload}>Download Report</button>
          <div className="chart-wrapper">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          <div className="chart-stats">
            <div><span>Unemployed</span><strong>42</strong></div>
            <div><span>Employed</span><strong>8</strong></div>
            <div><span>Trainee</span><strong>50</strong></div>
          </div>
        </div>

        {/* Recent Saved Jobs Table */}
        <div className="table-section">
          <h3>Org Recent Job Postings</h3>
          <div className="table-filters">
            {['Monthly', 'Weekly', 'Today'].map((filter) => (
              <button
                key={filter}
                className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <table className="jobs-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Category</th>
                <th>Openings</th>
                <th>Applications</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobData[activeFilter].map((job, index) => (
                <tr key={index}>
                  <td>{job.title}</td>
                  <td>{job.category}</td>
                  <td>{job.openings}</td>
                  <td>{job.applications}</td>
                  <td><span className={`status ${job.status.toLowerCase()}`}>{job.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
