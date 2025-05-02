import React, { useState, useEffect, useRef } from 'react';
import { FaGlobe, FaSearch, FaBell, FaCog, FaUser, FaGlobeAmericas,FaTimes, FaChevronDown } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './Header.css';
import logo from '../../assets/applogo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { countries, getCountryByCode } from '../CL';

const Header = ({ userType }) => {
  // State management
  const [isGlobeDropdownOpen, setGlobeDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [showCountryList, setShowCountryList] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(() => 
    localStorage.getItem('userRegion') || 'SA'
  );
  const [isDarkMode, setDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const dropdownContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initial preferences load
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        const region = data.preferences?.region || localStorage.getItem('userRegion') || 'SA';
        const darkMode = data.preferences?.darkMode || localStorage.getItem('darkMode') === 'true';
        
        setSelectedRegion(region);
        setDarkMode(darkMode);
        
        localStorage.setItem('userRegion', region);
        localStorage.setItem('darkMode', darkMode.toString());
        
        document.body.classList.toggle('dark-mode', darkMode);
      })
      .catch(error => {
        console.error('Error fetching preferences:', error);
        const savedRegion = localStorage.getItem('userRegion') || 'SA';
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        
        setSelectedRegion(savedRegion);
        setDarkMode(savedDarkMode);
        document.body.classList.toggle('dark-mode', savedDarkMode);
      });
  }, []);

  // Load notifications
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const fetchNotifications = () => {
      fetch(`/api/users/${userId}/notifications`)
        .then(res => res.json())
        .then(setNotifications)
        .catch(error => console.error('Error fetching notifications:', error));
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 300000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
        setGlobeDropdownOpen(false);
        setNotificationDropdownOpen(false);
        setShowCountryList(false);
        setSearchTerm('');
      }
    };
    const formatNotificationTime = (createdAt) => {
      const now = new Date();
      const notificationDate = new Date(createdAt);
      const diffInMinutes = Math.floor((now - notificationDate) / (1000 * 60));
    
      if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
      } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours}h ago`;
      } else {
        const days = Math.floor(diffInMinutes / 1440);
        return `${days}d ago`;
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === 'globe') {
      setGlobeDropdownOpen(!isGlobeDropdownOpen);
      setNotificationDropdownOpen(false);
      if (!isGlobeDropdownOpen) {
        setShowCountryList(false);
        setSearchTerm('');
      }
    } else if (dropdownType === 'notification') {
      setNotificationDropdownOpen(!isNotificationDropdownOpen);
      setGlobeDropdownOpen(false);
      setShowCountryList(false);
      setSearchTerm('');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.body.classList.toggle('dark-mode', newDarkMode);

    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`/api/users/${userId}/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ darkMode: newDarkMode }),
      }).catch(error => console.error('Error updating dark mode:', error));
    }
  };

  const handleRegionSelect = (countryCode) => {
    setSelectedRegion(countryCode);
    localStorage.setItem('userRegion', countryCode);
    // Close the country list and show the change button again
    setShowCountryList(false);
    setSearchTerm('');
  
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`/api/users/${userId}/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ region: countryCode }),
      }).catch(error => console.error('Error updating region:', error));
    }
  };

  const handleSettingsClick = () => {
    if (userType === 'employee') {
      navigate('/settings-employer');
    } else if (userType === 'jobseeker') {
      navigate('/settings-jobseeker');
    }
  };

  const handleSearchClick = () => {
    if (userType === 'admin') {
      navigate('/search-admin', { state: { userType } });
    } else if (userType === 'jobseeker') {
      navigate('/search-jobseeker', { state: { userType } });
    }
  };

  const handleProfileClick = () => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error('User ID not found');
      navigate('/login');
      return;
    }

    if (userType === 'jobseeker') {
      navigate(`/profile-jobseeker/${userId}`);
    }
  };

  const markNotificationAsRead = async (notificationId, e) => {
    e.stopPropagation();
    
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      await fetch(`/api/users/${userId}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setNotifications(notifications.map(notif => 
        notif._id === notificationId ? { ...notif, isRead: true } : notif
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/search-admin':
        return 'Search Jobs';
      case '/search-jobseeker':
        return 'Jobs';
      case '/settings-employer':
        return 'Settings';
      case '/settings-jobseeker':
        return 'Settings';
      case '/profile-jobseeker':
        return 'Profile';
      case '/JobPostingAdmin':
        return 'Job Posting';
      case '/UserActivity':
        return 'User Activity';
      case '/SystemPerformance':
        return 'System Performance';
      case '/JobPosting':
        return 'Job Posting';
      case '/MessageEmployers':
        return 'Message';
      case '/MessageJobSeekers':
        return 'Message';
      case '/ApplicationEmployers':
        return 'Application';
      case '/SavedJobs':
        return 'Saved Jobs'
      case '/ApplicationJobseekers':
        return 'Application';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="header">
      <div className="left-section">
        <img src={logo} alt="Logo" className="logo_header" />
        {userType === 'jobseeker' && (
          <FaUser 
            className="icon" 
            onClick={handleProfileClick}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      <h1 className="title">{getPageTitle()}</h1>
      <div className="right-section" ref={dropdownContainerRef}>
        <FaGlobe className="icon" onClick={() => toggleDropdown('globe')} />
        {isGlobeDropdownOpen && (
          <div className="dropdown-menu">
            <div className="selected-country">
  <div className="current-country">
    <FaGlobeAmericas className="country-icon" />
    <span>{getCountryByCode(selectedRegion)?.name || 'Select Country'}</span>
  </div>
  {showCountryList ? (
    <button 
      className="change-country-btn close"
      onClick={() => {
        setShowCountryList(false);
        setSearchTerm('');
      }}
    >
      <span>Close</span>
      <FaTimes />
    </button>
  ) : (
    <button 
      className="change-country-btn"
      onClick={() => setShowCountryList(true)}
    >
      <span>Change Country</span>
      <FaChevronDown />
    </button>
  )}
</div>
            
            {showCountryList && (
              <>
                <div className="country-search">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  <FaSearch className="search-icon" />
                </div>
                <div className="country-list">
                  {countries
                    .filter(country =>
                      country.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(country => (
                      <div
                        key={country.code}
                        className={`country-item ${selectedRegion === country.code ? 'selected' : ''}`}
                        onClick={() => handleRegionSelect(country.code)}
                      >
                        <FaGlobeAmericas className="country-icon" />
                        <span>{country.name}</span>
                      </div>
                    ))}
                </div>
              </>
            )}
            
            <div className="dropdown-item mode-toggle">
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              <div
                className={`toggle-button ${isDarkMode ? 'active' : ''}`}
                onClick={toggleDarkMode}
              >
                <div className="toggle-circle"></div>
              </div>
            </div>
          </div>
        )}

        {(userType === 'admin' || userType === 'jobseeker') && (
          <FaSearch 
            className="icon" 
            onClick={handleSearchClick}
          />
        )}

        {(userType === 'jobseeker' || userType === 'employee') && (
          <>
            <FaBell className="icon" onClick={() => toggleDropdown('notification')} />
            {isNotificationDropdownOpen && (
  <div className="notification-menu">
    <div className="notification-header">
      <h3>Notifications</h3>
      {notifications.some(n => !n.isRead) && (
        <button 
          className="mark-all-read"
          onClick={markAllNotificationsAsRead}
        >
          Mark all as read
        </button>
      )}
    </div>
    
    {notifications.length === 0 ? (
      <div className="notification-item empty">
        <p>No new notifications</p>
      </div>
    ) : (
      <div className="notification-list">
        {notifications
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((notification) => (
            <div 
              key={notification._id} 
              className={`notification-item ${notification.isRead ? 'read' : ''}`}
              onClick={() => {
                if (notification.link) {
                  navigate(notification.link);
                  markNotificationAsRead(notification._id);
                }
              }}
            >
              <div className="notification-icon">
                {notification.type === 'job' && <FaBriefcase />}
                {notification.type === 'interview' && <FaCalendar />}
                {notification.type === 'application' && <FaFileAlt />}
              </div>
              <div className="notification-content">
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <span className="notification-time">
                  {formatNotificationTime(notification.createdAt)}
                </span>
              </div>
              {!notification.isRead && (
                <div 
                  className="unread-indicator"
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(notification._id);
                  }}
                />
              )}
            </div>
          ))
        }
      </div>
    )}
  </div>
)}
          </>
        )}

        {(userType === 'jobseeker' || userType === 'employee') && (
          <FaCog 
            className="icon" 
            onClick={handleSettingsClick} 
          />
        )}
      </div>
    </div>
  );
};

export default Header;