import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../src/styles/App.css';
import Header from "./components/Header/Header";
import FilterForm from "./components/FilterForm/FilterForm";
import Jobs from "./components/Jobs/Jobs";
import JobView from "./components/Jobs/JobView/JobView";
import Auth from "./components/Auth/Auth";
import Company from "./components/Accounts/Company";
import User from "./components/Accounts/User";

interface filterData {
  title?: string;
  location?: string;
  fulltime?: string;
}

function App() {
  const [isViewJob, setIsViewJob] = useState(false);
  const [singleJobData, setSingleJobData] = useState('');
  const [filterData, setFilterData] = useState<filterData>({});
  const [authPage, setAuthPage] = useState(false);
  const [isAccountProfile, setIsAccountProfile] = useState('');
  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
    fetch('/api/health-check')
      .then(response => {
        if (!response.ok) {
          throw new Error('Backend is down');
        }
        setBackendAvailable(true);
      })
      .catch(() => {
        setBackendAvailable(false);
      });
  }, []);

  const setIsViewJobHandler = (job: any) => {
    setIsViewJob(true);
    setSingleJobData(job);
  };

  const onFilterJobHandler = (Data: filterData) => {
    setFilterData(Data);
  };

  const setAuthPageHandler = () => {
    setAuthPage(true);
  };

  const setJobsPageHandler = () => {
    setAuthPage(false);
    setIsViewJob(false);
    setIsAccountProfile('');
  };

  const setProfilePageHandler = () => {
    const token = localStorage.getItem('token');
    const accountType = localStorage.getItem('accountType');
    if (token && accountType === 'company') {
      setIsAccountProfile('company');
    } else if (token && accountType === 'user') {
      setIsAccountProfile('user');
    } else {
      setAuthPage(true);
    }
  };

  if (!backendAvailable) {
    return (
      <div className="App">
        <h1>Backend Server is Down</h1>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header
          setJobsPage={setJobsPageHandler}
          setProfilePage={setProfilePageHandler}
        />
        <Routes>
          <Route path="/" element={
            (isAccountProfile === '') && !authPage && (!isViewJob && <>
              <FilterForm filterJobsForm={onFilterJobHandler} />
              <Jobs filterData={filterData} setIsViewJob={setIsViewJobHandler} />
            </>)
          } />
          <Route path="/company" element={
            !authPage && (!isViewJob && ((isAccountProfile === 'company') && <Company removeAccount={() => { setIsAccountProfile('') }} setIsViewJob={setIsViewJobHandler} />))
          } />
          <Route path="/user" element={
            !authPage && (!isViewJob && ((isAccountProfile === 'user') && <User removeAccount={() => { setIsAccountProfile('') }} setIsViewJob={setIsViewJobHandler} />))
          } />
          <Route path="/job-view" element={
            !authPage && (isViewJob && <JobView setAuthPage={setAuthPageHandler} jobData={singleJobData} />)
          } />
          <Route path="/auth" element={
            authPage && <Auth removeAuth={() => { setAuthPage(false); setIsViewJob(false); }} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;