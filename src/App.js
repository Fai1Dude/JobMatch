import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ADashboardContent from './components/DashboardContents/ADashboardContent';
import JBDashboardContent from './components/DashboardContents/JBDashboardContent';
import EDashboardContent from './components/DashboardContents/EDashboardContent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import SettingsEmployer from './components/Settings/Settings-Employer';
import SettingsJobSeeker from './components/Settings/Settings-JobSeeker';
import SearchAdmin from './components/Search/SearchAdmin';
import SearchJobSeekers from './components/Search/SearchJobSeekers';
import ProfileJobSeeker from './components/Profile/Profile-JobSeeker';
import JobDetail from './components/JobDetails/Jobdetails';
import SystemPerformance from './components/SystemPerformance/SystemPerformance';
import './App.css';
import UserActivity from './components/UserActivity/UserActivity';
import JobPostingAdmin from './components/JobPosting/JobPostingAdmin';
import JobPosting from './components/JobPosting/JobPosting';
import MessageEmployers from './components/Message/MessageEmployers';
import ApplicationEmployers from './components/Application/ApplicationEmployers';
import SavedJobs from './components/SavedJobs/SavedJobs';
import MessageJobSeekers from './components/Message/MessageJobSeekers';
import ApplicationJobseekers from './components/Application/ApplicationJobseekers';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />

          {/* Dashboard Route */}
          <Route
            path="/ADashboardContent"
            element={
              <Layout>
                <ADashboardContent />
              </Layout>
            }
          />
          <Route
            path="/JBDashboardContent"
            element={
              <Layout>
                <JBDashboardContent />
              </Layout>
            }
          />
          <Route
            path="/EDashboardContent"
            element={
              <Layout>
                <EDashboardContent />
              </Layout>
            }
          />

          {/* Root Route */}
          <Route path="/" element={<Login />} />

          {/* Settings Routes with Layout */}
          <Route
            path="/settings-employer"
            element={
              <Layout>
                <SettingsEmployer />
              </Layout>
            }
          />
          <Route
            path="/settings-jobseeker"
            element={
              <Layout>
                <SettingsJobSeeker />
              </Layout>
            }
          />

          {/* Search Routes with Layout */}
          <Route
            path="/search-admin"
            element={
              <Layout>
                <SearchAdmin />
              </Layout>
            }
          />
          <Route
            path="/search-jobseeker"
            element={
              <Layout>
                <SearchJobSeekers />
              </Layout>
            }
          />
          <Route 
            path="/job/:jobId" 
            element={
              <Layout>
                <JobDetail />
                </Layout> 
              } 
              />

          {/* Profile Route */}
          <Route
            path="/profile-jobseeker"
            element={
              <Layout>
                <ProfileJobSeeker />
              </Layout>
            }
          />

          {/* Ststem Performanc Route*/}
          <Route
            path="/SystemPerformance"
            element={
              <Layout>
                <SystemPerformance />
              </Layout>
            }
          />

          {/* User Activity Route */}
          <Route
            path="/UserActivity"
            element={
              <Layout>
                <UserActivity />
              </Layout>
            }
          />
          {/* JobPostingAdmin Route */}
          <Route
            path="/JobPostingAdmin"
            element={
              <Layout>
                <JobPostingAdmin />
              </Layout>
            }
          />

          {/* JobPosting Route */}
          <Route
            path="/JobPosting"
            element={
              <Layout>
                <JobPosting />
              </Layout>
            }
          />
          
          {/* MessageEmployers Route */}
          <Route
            path="/MessageEmployers"
            element={
              <Layout>
                <MessageEmployers />
              </Layout>
            }
          />
          
          {/* ApplicationEmployers Route */}
          <Route
            path="/ApplicationEmployers"
            element={
              <Layout>
                <ApplicationEmployers />
              </Layout>
            }
          />
          
          {/* SavedJobs Route */}
          <Route
            path="/SavedJobs"
            element={
              <Layout>
                <SavedJobs />
              </Layout>
            }
          />
          {/* MessageJobSeekers Route */}
          <Route
            path="/MessageJobSeekers"
            element={
              <Layout>
                <MessageJobSeekers />
              </Layout>
            }
          />
          
          {/* ApplicationJobseekers Route */}
          <Route
            path="/ApplicationJobseekers"
            element={
              <Layout>
                <ApplicationJobseekers />
              </Layout>
            }
          />

          {/* Profile Routes */}
          <Route
            path="/profile/:id"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/profile-jobseeker/:id"
            element={
              <Layout>
                <ProfileJobSeeker />
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
