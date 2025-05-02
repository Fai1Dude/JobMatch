import React, { useState } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { BsBookmarkFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import './SavedJobs.css';

const SavedJobs = () => {
  // Initialize savedJobs as a state variable
  const [savedJobs, setSavedJobs] = useState([
    {
      id: '1',
      title: 'Frontend Developer',
      salary: '$20,000 - $25,000',
      company: 'Tech Corp',
      location: 'New York, NY',
    },
    {
      id: '2',
      title: 'Backend Developer',
      salary: '$22,000 - $27,000',
      company: 'Innovate Ltd',
      location: 'San Francisco, CA',
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      salary: '$25,000 - $30,000',
      company: 'Web Solutions',
      location: 'Remote',
    },
    {
      id: '4',
      title: 'Data Scientist',
      salary: '$28,000 - $35,000',
      company: 'Analytics Corp',
      location: 'Boston, MA',
    },
  ]);

  // Function to remove a job from the savedJobs list
  const removeJob = (jobId) => {
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  return (
    <div className="saved-jobs-container">
      {savedJobs.length > 0 ? (
        <div className="job-list">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              jobId={job.id}
              title={job.title}
              salary={job.salary}
              company={job.company}
              location={job.location}
              onRemoveJob={removeJob}
            />
          ))}
        </div>
      ) : (
        <p>You have no saved jobs.</p>
      )}
    </div>
  );
};

const JobCard = ({ jobId, title, salary, company, location, onRemoveJob }) => (
  <div className="job-card">
    <div className="job-card-content">
      <h3>{title}</h3>
      <p>
        <span className="job-type">FULL-TIME</span> Salary: {salary}
      </p>
      <div className="company-info">
        <FcGoogle className="company-logo" />
        <div>
          <p>{company}</p>
          <p><CiLocationOn /> {location}</p>
        </div>
      </div>
    </div>
    <div
      className="bookmark-icon"
      onClick={() => onRemoveJob(jobId)}
      style={{ cursor: "pointer" }}
      title="Remove from Saved Jobs"
    >
      <BsBookmarkFill color="#FFD700" />
    </div>
  </div>
);

export default SavedJobs;
