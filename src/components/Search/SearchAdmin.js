import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaSearch, FaArrowAltCircleRight } from "react-icons/fa";
import { LiaFilterSolid } from "react-icons/lia";
import { CiLocationOn, CiBookmark } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BsBookmarkFill } from "react-icons/bs"; // Import filled bookmark icon
import './Search.css';

const Search = () => {
  const [showJobs, setShowJobs] = useState(false);  // State to control job and pagination visibility
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedJobs, setBookmarkedJobs] = useState({}); // Track bookmarks with job IDs

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFindJobClick = () => {
    setShowJobs(true);  // Show job list and pagination when Find Job button is clicked
  };

  const toggleBookmark = (jobId) => {
    setBookmarkedJobs((prevBookmarks) => ({
      ...prevBookmarks,
      [jobId]: !prevBookmarks[jobId], // Toggle bookmark for the specific job
    }));
  };

  return (
    <div className="search-container">
      <SearchBar onFindJobClick={handleFindJobClick} />
      {showJobs && <JobList currentPage={currentPage} bookmarkedJobs={bookmarkedJobs} onToggleBookmark={toggleBookmark} />}
      {showJobs && <Pagination currentPage={currentPage} onPageChange={handlePageChange} />}
    </div>
  );
};

const SearchBar = ({ onFindJobClick }) => (
  <div className="search-bar">
    <div style={{ display: "flex", width: "516px", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "4px 8px" }}>
      <FaSearch style={{ marginRight: "8px", color: "#0A65CC" }} />
      <input
        className="search"
        type="text"
        placeholder="Search by: Job title, Position, Keyword..."
        style={{ border: "none", outline: "none", flex: 1 }}
      />
    </div>
    <div style={{ display: "flex", width: "424px", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "4px 8px" }}>
      <CiLocationOn style={{ marginRight: "8px", color: "#0A65CC" }} />
      <input
        className="code"
        type="text"
        placeholder="City, state or zip code"
        style={{ border: "none", outline: "none", flex: 1 }}
      />
    </div>
    <button className="filters"><LiaFilterSolid /> Filters</button>
    <button className="find-job-btn" onClick={onFindJobClick}>Find Job</button>  {/* Button to reveal job list and pagination */}
  </div>
);

const JobCard = ({ jobId, title, salary, company, location, isBookmarked, onToggleBookmark }) => (
  <div className="job-card">
    <div className="job-card-content">
      <h3>{title}</h3>
      <p>
        <span className="job-type">FULL-TIME</span> Salary: {salary}
      </p>
      <div className="company-info">
        <FcGoogle id="google" />
        <div>
          <p>{company}</p>
          <p><CiLocationOn /> {location}</p>
        </div>
      </div>
    </div>
    <div className="bookmark-icon" onClick={() => onToggleBookmark(jobId)} style={{ cursor: "pointer" }}>
      {isBookmarked ? <BsBookmarkFill color="#FFD700" /> : <CiBookmark />} {/* Change icon when bookmarked */}
    </div>
  </div>
);

const JobList = ({ currentPage, bookmarkedJobs, onToggleBookmark }) => {
  const jobTitles = {
    1: [
      { id: '1-1', title: "Software Engineer" },
      { id: '1-2', title: "UI/UX Designer" },
      { id: '1-3', title: "Visual Designer" },
      { id: '1-4', title: "Product Designer" }
    ],
    2: [
      { id: '2-1', title: "Frontend Developer" },
      { id: '2-2', title: "Backend Developer" },
      { id: '2-3', title: "Project Manager" },
      { id: '2-4', title: "Data Analyst" }
    ],
    3: [
      { id: '3-1', title: "Marketing Specialist" },
      { id: '3-2', title: "Sales Associate" },
      { id: '3-3', title: "Content Writer" },
      { id: '3-4', title: "SEO Expert" }
    ],
    4: [
      { id: '4-1', title: "Graphic Designer" },
      { id: '4-2', title: "DevOps Engineer" },
      { id: '4-3', title: "Customer Support" },
      { id: '4-4', title: "HR Specialist" }
    ],
    5: [
      { id: '5-1', title: "Research Scientist" },
      { id: '5-2', title: "Game Developer" },
      { id: '5-3', title: "Mobile Developer" },
      { id: '5-4', title: "IT Consultant" }
    ],
  };

  const jobs = jobTitles[currentPage] || [];

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          jobId={job.id}
          title={job.title}
          salary="$20,000 - $25,000"
          company="Google Inc."
          location="Dammam, SA"
          isBookmarked={!!bookmarkedJobs[job.id]} // Check bookmark status for each job
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

const Pagination = ({ currentPage, onPageChange }) => (
  <div className="pagination">
    <button
      className="arrow-btn"
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
    >
      <FaArrowAltCircleLeft />
    </button>
    <ul className="pagination-list">
      {[1, 2, 3, 4, 5].map((page) => (
        <li
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-item ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </li>
      ))}
    </ul>
    <button
      className="arrow-btn"
      onClick={() => onPageChange(Math.min(currentPage + 1, 5))}
      disabled={currentPage === 5}
    >
      <FaArrowAltCircleRight />
    </button>
  </div>
);

export default Search;