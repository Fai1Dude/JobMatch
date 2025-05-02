import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserActivity.css';
import banner from '../../assets/banner.png';

const UserActivity = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch employees
        const employeesResponse = await fetch('http://localhost:5000/api/users/employees');
        const employeesData = await employeesResponse.json();
        
        // Fetch job seekers
        const jobSeekersResponse = await fetch('http://localhost:5000/api/users/jobseekers');
        const jobSeekersData = await jobSeekersResponse.json();

        setEmployees(employeesData);
        setJobSeekers(jobSeekersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEmployeeClick = (employeeId) => {
    navigate(`/profile/${employeeId}`);
  };

  const handleJobSeekerClick = (seekerId) => {
    navigate(`/profile-jobseeker/${seekerId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-activity">
      <div className="banner">
        <img src={banner} alt="JobMatch banner" className="banner" />
      </div>

      <div className="users-grid">
        <div className="users-section">
          <h3>Users</h3>
          <div className="user-type">Employees</div>
          <div className="user-list">
            {employees.map((employee) => (
              <div className="user-item" key={employee._id}>
                <div className="user-info">
                  <span className="star-icon">⭐</span>
                  <span className="name">{`${employee.profile.firstName} ${employee.profile.lastName}`}</span>
                </div>
                <div className="user-stats">
                  <span className="sees">0 See</span>
                  <button 
                    className="see-more"
                    onClick={() => handleEmployeeClick(employee._id)}
                  >
                    See more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="users-section">
          <h3>Users</h3>
          <div className="user-type">Job Seekers</div>
          <div className="user-list">
            {jobSeekers.map((seeker) => (
              <div className="user-item" key={seeker._id}>
                <div className="user-info">
                  <span className="star-icon">⭐</span>
                  <span className="name">{`${seeker.profile.firstName} ${seeker.profile.lastName}`}</span>
                </div>
                <div className="user-stats">
                  <span className="sees">0 See</span>
                  <button 
                    className="see-more"
                    onClick={() => handleJobSeekerClick(seeker._id)}
                  >
                    See more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;