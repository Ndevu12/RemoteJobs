import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import JobsPage from "./pages/Jobs/JobsPage";
import SingleJobPage from "./pages/Jobs/SingleJobPage";
import Auth from "./components/Auth/Auth";
import { useBackendAvailability } from "./Hooks/AppStatus/useBackendAvailability";
import { useAuth } from "./Hooks/auth/useAuth";
import { useJobView } from "./Hooks/jobs/useJobView";
import Footer from "./components/Footer/Footer";

function App() {
  const backendAvailable = useBackendAvailability();
  const {
    showAuthPage,
  } = useAuth();
  const { setJobView } = useJobView();

  const handleFilterJobs = (filterData: { title?: string }) => {
    // Handle job filtering logic here
  };

  const handleProfileClick = () => {
    // Handle profile click logic here
  };

  const handleLogoClick = () => {
    // Handle logo click logic here
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
          onFilterJobs={handleFilterJobs}
          onProfileClick={handleProfileClick}
          onLogoClick={handleLogoClick}
        />
        <Routes>
          <Route 
          path="/" 
          element={
          <JobsPage />
          } 
          />
        
          <Route
            path="/job/:jobId"
            element={<SingleJobPage setAuthPage={showAuthPage} />}
          />
          <Route
            path="/auth"
            element={<Auth removeAuth={() => showAuthPage(false)} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;