import React, { useState, useEffect } from 'react';
import './JobPostingAdmin.css';
import Banner from '../../assets/banner.png';

const JobPostingAdmin = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    shiftSalary: '',
    jobInfo: '',
    requirements: '',
    keyResponsibilities: ''
  });
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
    setJobDetails({
      jobTitle: job.title,
      shiftSalary: job.shiftSalary,
      jobInfo: job.jobInfo,
      requirements: job.requirements,
      keyResponsibilities: job.keyResponsibilities
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${selectedJob._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Job post updated successfully');
        setJobs(jobs.map(job => job._id === selectedJob._id ? data.updatedJob : job));
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Server error. Please try again.');
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Job post deleted successfully');
        setJobs(jobs.filter(job => job._id !== jobId));
        if (selectedJob && selectedJob._id === jobId) {
          setSelectedJob(null);
          setJobDetails({
            jobTitle: '',
            shiftSalary: '',
            jobInfo: '',
            requirements: '',
            keyResponsibilities: ''
          });
        }
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Job Postings</h1>
      </div>

      <div className="banner">
        <img src={Banner} alt="JobMatch banner" className="banner" />
      </div>

      <div className="job-content">
        <div className="job-list">
          <h3>Job Posts</h3>
          <ul>
            {jobs.map(job => (
              <li key={job._id}>
                <div className="job-info">
                  <h4>{job.title}</h4>
                  <p><strong>Company:</strong> {job.companyName}</p>
                  <p><strong>Location:</strong> {job.jobLocation}</p>
                  <p><strong>Info:</strong> {job.jobInfo}</p>
                  <p><strong>Requirements:</strong> {job.requirements}</p>
                  <p><strong>Responsibilities:</strong> {job.keyResponsibilities}</p>
                  <button onClick={() => handleSelectJob(job)}>Select</button>
                  <button onClick={() => handleDelete(job._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="modifications-panel">
          <h3>Modifications</h3>
          <form onSubmit={handleUpdate}>
            <div className="mod-input-group">
              <label>
                <span>⭐ Job title</span>
                <div className="input-with-badge">
                  <input 
                    type="text" 
                    placeholder="Note here"
                    value={jobDetails.jobTitle}
                    onChange={(e) => setJobDetails({...jobDetails, jobTitle: e.target.value})}
                  />
                  <span className="badge">0 A</span>
                </div>
              </label>
            </div>

            <div className="mod-input-group">
              <label>
                <span>⭐ Shift - Salary</span>
                <div className="input-with-badge">
                  <input 
                    type="text" 
                    placeholder="Note here"
                    value={jobDetails.shiftSalary}
                    onChange={(e) => setJobDetails({...jobDetails, shiftSalary: e.target.value})}
                  />
                  <span className="badge">0 A</span>
                </div>
              </label>
            </div>

            <div className="mod-input-group">
              <label>
                <span>⭐ Job info</span>
                <div className="input-with-badge">
                  <input 
                    type="text" 
                    placeholder="Note here"
                    value={jobDetails.jobInfo}
                    onChange={(e) => setJobDetails({...jobDetails, jobInfo: e.target.value})}
                  />
                  <span className="badge">0 A</span>
                </div>
              </label>
            </div>

            <div className="mod-input-group">
              <label>
                <span>⭐ Requirements</span>
                <div className="input-with-badge">
                  <input 
                    type="text" 
                    placeholder="Note here"
                    value={jobDetails.requirements}
                    onChange={(e) => setJobDetails({...jobDetails, requirements: e.target.value})}
                  />
                  <span className="badge">0 A</span>
                </div>
              </label>
            </div>

            <div className="mod-input-group">
              <label>
                <span>⭐ Key Responsibilities</span>
                <div className="input-with-badge">
                  <input 
                    type="text" 
                    placeholder="Note here"
                    value={jobDetails.keyResponsibilities}
                    onChange={(e) => setJobDetails({...jobDetails, keyResponsibilities: e.target.value})}
                  />
                  <span className="badge">0 A</span>
                </div>
              </label>
            </div>

            <div className="button-group">
              <button type="submit" className="publish-btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingAdmin; 