import React, { useState } from 'react';
import './JobPosting.css';
import Banner from '../../assets/banner.png';

const JobPosting = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    companyName: '',
    jobLocation: '',
    jobInfo: '',
    orgInfo: '',
    connections: '',
    skills: '',
    description: '',
    requirements: '',
    instructions: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/jobs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Job post created successfully');
        // Optionally, reset the form
        setJobDetails({
          title: '',
          companyName: '',
          jobLocation: '',
          jobInfo: '',
          orgInfo: '',
          connections: '',
          skills: '',
          description: '',
          requirements: '',
          instructions: ''
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="job-posting-container">

      <div className="banner">
        <img src={Banner} alt="JobMatch banner" className="banner" />
      </div>

      <div className="content-wrapper">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Job: write title here</label>
              <input 
                type="text" 
                value={jobDetails.title}
                onChange={(e) => setJobDetails({...jobDetails, title: e.target.value})}
              />
            </div>

            <div className="company-info">
              <div className="input-group">
                <label>Company name</label>
                <input 
                  type="text"
                  value={jobDetails.companyName}
                  onChange={(e) => setJobDetails({...jobDetails, companyName: e.target.value})}
                />
              </div>
              
              <div className="input-group">
                <label>Job location</label>
                <input 
                  type="text"
                  value={jobDetails.jobLocation}
                  onChange={(e) => setJobDetails({...jobDetails, jobLocation: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Job info: Full-time · Mid-Senior level</label>
              <input 
                type="text"
                value={jobDetails.jobInfo}
                onChange={(e) => setJobDetails({...jobDetails, jobInfo: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label>Org info · Real Estate</label>
              <input 
                type="text"
                value={jobDetails.orgInfo}
                onChange={(e) => setJobDetails({...jobDetails, orgInfo: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label>8 connection · 8 school alumni</label>
              <input 
                type="text"
                value={jobDetails.connections}
                onChange={(e) => setJobDetails({...jobDetails, connections: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label>Skills: write here...</label>
              <input 
                type="text"
                value={jobDetails.skills}
                onChange={(e) => setJobDetails({...jobDetails, skills: e.target.value})}
              />
            </div>
            
            <div className="input-group">
              <label>Job detailed description</label>
              <textarea 
                placeholder="write here..."
                value={jobDetails.description}
                onChange={(e) => setJobDetails({...jobDetails, description: e.target.value})}
              />
            </div>
            
            <div className="input-group">
              <label>Requirements</label>
              <textarea 
                placeholder="write here..."
                value={jobDetails.requirements}
                onChange={(e) => setJobDetails({...jobDetails, requirements: e.target.value})}
              />
            </div>
            
            <div className="input-group">
              <label>Application instructions</label>
              <textarea 
                placeholder="write here..."
                value={jobDetails.instructions}
                onChange={(e) => setJobDetails({...jobDetails, instructions: e.target.value})}
              />
            </div>

            <div className="button-group">
              <button type="button" className="save-btn">Save</button>
              <button type="submit" className="publish-btn">Publish</button>
            </div>
          </form>
        </div>

        <div className="table-section">
          <div className="table-header">
            <h2>Org Recent Job Postings</h2>
            <div className="filter-buttons">
              <button>Monthly</button>
              <button>Weekly</button>
              <button className="active">Today</button>
            </div>
          </div>

          <table>
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
              <tr>
                <td>UI UX Designer</td>
                <td>Full Time</td>
                <td>12</td>
                <td>126</td>
                <td><span className="status active">Active</span></td>
              </tr>
              <tr>
                <td>Full Stack Developer</td>
                <td>Full Time </td>
                <td>08</td>
                <td>100</td>
                <td><span className="status inactive">Inactive</span></td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
