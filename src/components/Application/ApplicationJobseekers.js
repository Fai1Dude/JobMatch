// ApplicationPage.js
import React from 'react';
import './ApplicationJobseekers.css';

const ApplicationPage = () => {
  const appliedJobs = [
    {
      id: '1-1',
      title: 'Software Engineer',
      company: 'Google Inc.',
      location: 'Dammam, SA',
      salary: '$20,000 - $25,000',
      description: 'Develop and maintain software applications, perform code reviews, and collaborate with cross-functional teams to ensure software quality.',
      type: 'Full-Time'
    },
    {
      id: '1-2',
      title: 'UI/UX Designer',
      company: 'Apple Inc.',
      location: 'Riyadh, SA',
      salary: '$18,000 - $22,000',
      description: 'Design user interfaces and enhance user experience for digital products by conducting user research and creating wireframes.',
      type: 'Part-Time'
    },
  ];

  return (
    <div className="application-page">
      <div className="job-list">
        {appliedJobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-card-content">
              <h3>{job.title}</h3>
              <div className="company-info">
                <p><strong>Company:</strong> {job.company}</p>
                <span className="job-type">{job.type}</span>
              </div>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Description:</strong> {job.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationPage;
