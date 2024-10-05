import { useState, useEffect } from 'react';

export const useBackendAvailability = () => {
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

  return backendAvailable;
};