import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { IoPerson } from "react-icons/io5"; 
import './ApplicationEmployers.css';

const SearchBar = () => (
  <div className="search-bar">
    <div style={{ display: "flex", width: "516px", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", padding: "4px 8px" }}>
      <FaSearch style={{ marginRight: "8px", color: "#99A2AD" }} />
      <input
        type="text" placeholder="Search Applicants"
        style={{ border: "none", outline: "none", flex: 1 }}
      />
    </div>
    <LuSettings2 id='set' style={{ marginRight: "8px", color: "#0A66C2" }} />
  </div>
);

const FilterButtons = ({ currentFilter, setFilter }) => {
  const filters = ["All", "Employed", "Unemployed", "Trainee"];

  return (
    <div className="filter-buttons">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-button ${currentFilter === filter ? 'selected' : ''}`}
          onClick={() => setFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const ApplicantCard = ({ name, status, time }) => (
  <div className="applicant-card">
    <div className="avatar">
        <IoPerson size={24} />
      </div>
    <div className="applicant-info">
      <h4>{name}</h4>
      <p>{status}</p>
    </div>
    <div className="applicant-time">{time}</div>
  </div>
);

const ApplicantList = ({ applicants, currentFilter }) => {
  const filteredApplicants = applicants.filter(applicant =>
    currentFilter === "All" || applicant.status.includes(currentFilter)
  );

  return (
    <div className="applicant-list">
      {filteredApplicants.map((applicant, index) => (
        <ApplicantCard key={index} name={applicant.name} status={applicant.status} time={applicant.time} />
      ))}
    </div>
  );
};

const ScheduleInterview = () => {
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (selectedApplicant && selectedDate && selectedTime) {
      setMessage(`Interview scheduled for ${selectedApplicant} on ${selectedDate} at ${selectedTime}`);
    } else {
      setMessage("Please select an applicant, date, and time before saving.");
    }
  };

  return (
    <div className="schedule-interview">
      <h2>Schedule Interviews</h2>
      
      <div className="section">
        <h3>Applicants</h3>
        <div className="applicant-buttons">
          {["Mohamed", "Ahmed", "Omar", "Osama"].map((applicant) => (
            <button
              key={applicant}
              onClick={() => setSelectedApplicant(applicant)}
              className={`applicant-button ${selectedApplicant === applicant ? 'selected' : ''}`}
            >
              {applicant}
            </button>
          ))}
          <button className="add-button">+ Add</button>
        </div>
      </div>

      <div className="section">
        <h3>Timings</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-date"
        />
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="input-time"
        />
      </div>

      <div className="action-buttons">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="send-button">Send</button>
      </div>

      {message && <div className="message">{message}</div>}
    </div>
  );
};
const Application = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  const applicants = [
    { name: "Ibrahim", status: "Employed Applicant", time: "11:11 AM" },
    { name: "Hani", status: "Unemployed Applicant", time: "11:11 AM" },
    { name: "Kfupm university trainee", status: "Trainee", time: "11:11 AM" },
    { name: "Abdallah", status: "Trainee", time: "11:11 AM" },
  ];

  return (
    <div className="applicant-container">
      <div className="left-container">
        <SearchBar />
        <FilterButtons currentFilter={currentFilter} setFilter={setCurrentFilter} />
        <ApplicantList applicants={applicants} currentFilter={currentFilter} />
      </div>
      <div className="right-container">
        <ScheduleInterview />
      </div>
    </div>
  );
};

export default Application;
