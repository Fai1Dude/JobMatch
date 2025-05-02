import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import SidebarAdmin from '../Sidebar/Sidebar-Admin';
import SidebarEmployer from '../Sidebar/Sidebar-Employers';
import SidebarJobSeeker from '../Sidebar/Sidebar-JobSeeker';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const userTypeFromState = location?.state?.userType;

  const userType = userTypeFromState || localStorage.getItem('userType');

  useEffect(() => {
    if (userTypeFromState) {
      localStorage.setItem('userType', userTypeFromState);
    }
  }, [userTypeFromState]);

  const renderSidebar = () => {
    switch (userType) {
      case 'admin':
        return <SidebarAdmin />;
      case 'jobseeker':
        return <SidebarJobSeeker />;
      case 'employee':
        return <SidebarEmployer />;
      default:
        return null; 
    }
  };

  return (
    <div className="layout">
      <div className="header-wrapper">
        <Header userType={userType} />
      </div>
      <div className="layout-container">
        <div className="sidebar-wrapper">
          {renderSidebar()} 
        </div>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
