import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Jobdetails.css';


const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Sample data for demonstration; replace with actual data fetching
  const jobData = {
    '1-1': {
    title: 'Software Engineer',
    description: 'Develops and maintains software applications, performs code reviews, and collaborates with cross-functional teams to ensure software quality.',
    salary: '$20,000 - $25,000',
    location: 'Dammam, SA',
    company: 'Google Inc.',
  },
  '1-2': {
    title: 'UI/UX Designer',
    description: 'Designs user interfaces and enhances user experience for digital products by conducting user research and creating wireframes.',
    salary: '$18,000 - $22,000',
    location: 'Riyadh, SA',
    company: 'Apple Inc.',
  },
  '1-3': {
    title: 'Visual Designer',
    description: 'Creates visually appealing designs for digital platforms, including websites, mobile apps, and social media content.',
    salary: '$15,000 - $20,000',
    location: 'Jeddah, SA',
    company: 'Adobe Systems',
  },
  '1-4': {
    title: 'Product Designer',
    description: 'Oversees the entire design process for a product, from conception to final delivery, ensuring user satisfaction and usability.',
    salary: '$25,000 - $30,000',
    location: 'Khobar, SA',
    company: 'Microsoft Corp.',
  },
  '2-1': {
    title: 'Frontend Developer',
    description: 'Builds and optimizes user interfaces for web applications, working closely with designers to implement UI components.',
    salary: '$22,000 - $28,000',
    location: 'Jeddah, SA',
    company: 'Facebook Inc.',
  },
  '2-2': {
    title: 'Backend Developer',
    description: 'Develops server-side logic and APIs for web applications, ensuring high performance and responsiveness.',
    salary: '$24,000 - $30,000',
    location: 'Dammam, SA',
    company: 'Amazon Inc.',
  },
  '2-3': {
    title: 'Project Manager',
    description: 'Plans, executes, and monitors projects, ensuring they are completed on time, within budget, and meet stakeholder expectations.',
    salary: '$35,000 - $45,000',
    location: 'Riyadh, SA',
    company: 'IBM Corp.',
  },
  '2-4': {
    title: 'Data Analyst',
    description: 'Analyzes data to generate insights, produces reports, and provides recommendations for business improvement.',
    salary: '$20,000 - $25,000',
    location: 'Jeddah, SA',
    company: 'SAP SE',
  },
  '3-1': {
    title: 'Marketing Specialist',
    description: 'Develops marketing strategies, conducts market research, and coordinates promotional campaigns.',
    salary: '$18,000 - $23,000',
    location: 'Khobar, SA',
    company: 'PepsiCo',
  },
  '3-2': {
    title: 'Sales Associate',
    description: 'Assists customers in making purchasing decisions, processes transactions, and maintains knowledge of products.',
    salary: '$15,000 - $18,000',
    location: 'Riyadh, SA',
    company: 'Amazon Inc.',
  },
  '3-3': {
    title: 'Content Writer',
    description: 'Creates written content for websites, blogs, and social media, ensuring content aligns with brand guidelines.',
    salary: '$12,000 - $16,000',
    location: 'Jeddah, SA',
    company: 'HubSpot Inc.',
  },
  '3-4': {
    title: 'SEO Expert',
    description: 'Optimizes website content to improve search engine rankings, conducts keyword research, and analyzes SEO performance.',
    salary: '$18,000 - $22,000',
    location: 'Dammam, SA',
    company: 'LinkedIn Corp.',
  },
  '4-1': {
    title: 'Graphic Designer',
    description: 'Creates visual concepts, using computer software, to communicate ideas that inspire, inform, or captivate consumers.',
    salary: '$16,000 - $20,000',
    location: 'Riyadh, SA',
    company: 'Adobe Systems',
  },
  '4-2': {
    title: 'DevOps Engineer',
    description: 'Develops and maintains infrastructure for software deployments, optimizes CI/CD processes, and automates system configurations.',
    salary: '$30,000 - $40,000',
    location: 'Jeddah, SA',
    company: 'Red Hat Inc.',
  },
  '4-3': {
    title: 'Customer Support',
    description: 'Assists customers with product inquiries, resolves complaints, and ensures customer satisfaction.',
    salary: '$12,000 - $15,000',
    location: 'Dammam, SA',
    company: 'Zendesk',
  },
  '4-4': {
    title: 'HR Specialist',
    description: 'Manages recruitment processes, employee onboarding, and contributes to employee relations initiatives.',
    salary: '$20,000 - $25,000',
    location: 'Riyadh, SA',
    company: 'Oracle Corp.',
  },
  '5-1': {
    title: 'Research Scientist',
    description: 'Conducts scientific research and experiments, analyzes data, and publishes findings in reputable journals.',
    salary: '$45,000 - $55,000',
    location: 'Riyadh, SA',
    company: 'MIT Labs',
  },
  '5-2': {
    title: 'Game Developer',
    description: 'Designs, prototypes, and builds video games for various platforms, ensuring an engaging user experience.',
    salary: '$25,000 - $35,000',
    location: 'Jeddah, SA',
    company: 'Electronic Arts',
  },
  '5-3': {
    title: 'Mobile Developer',
    description: 'Develops and maintains applications for mobile devices, ensuring compatibility with iOS and Android platforms.',
    salary: '$22,000 - $30,000',
    location: 'Khobar, SA',
    company: 'Snap Inc.',
  },
  '5-4': {
    title: 'IT Consultant',
    description: 'Provides technology-related guidance to clients, helping optimize and implement IT solutions for business needs.',
    salary: '$30,000 - $40,000',
    location: 'Dammam, SA',
    company: 'Accenture',
  },
};

  const job = jobData[jobId];
  const [applied, setApplied] = useState(false);

  const handleApplyClick = () => {
    setApplied(true); // Set applied to true to show the application message
  };
  if (!job) {
    return <p>Job not found</p>;
  }

  return (
    <div className="job-detail">
      <h1>{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description}</p>
    <button onClick={handleApplyClick}>Apply</button> 
    {applied && <p className="application-message">You have successfully applied to this job!</p>}     
    <button onClick={() => navigate(-1)}>Go Back</button> {/* Button to navigate back */}
    </div>
  );
};

export default JobDetail;
