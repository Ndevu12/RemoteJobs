import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import JobsPage from './pages/Jobs/JobsPage';
import SingleJobPage from './pages/Jobs/SingleJobPage';
import Auth from './pages/Auth/Auth';
import ProfilePage from './pages/profile/ProfilePage';
import UserJobsPage from './pages/Jobs/userJobsPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import NotFound from './pages/Auth/NotFound';
import ApplicantsPage from './pages/Jobs/ApplicantsPage';

const App: React.FC = () => {

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={<JobsPage />} 
          />
          <Route
            path="/job/:jobId"
            element={<SingleJobPage />}
          />

          <Route path="*" element={<NotFound />} />

          <Route
            path="/auth"
            element={<Auth />}
          />
          <Route path="/jobs/:jobId/applicants" element={<ApplicantsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user-jobs" element={<UserJobsPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;