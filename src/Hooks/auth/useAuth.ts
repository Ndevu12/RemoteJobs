import { useState } from 'react';

export const useAuth = () => {
  const [authPage, setAuthPage] = useState(false);
  const [isAccountProfile, setIsAccountProfile] = useState('');

  const setProfilePage = () => {
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

  const setJobsPage = () => {
    setAuthPage(false);
    setIsAccountProfile('');
  };

  // Wrapper function to match the expected type
  const showAuthPage = (p0: boolean) => {
    setAuthPage(true);
  };

  return { authPage, isAccountProfile, setProfilePage, setJobsPage, showAuthPage };
};