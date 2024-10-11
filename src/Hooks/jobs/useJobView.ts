import { useState } from 'react';

export const useJobView = () => {
  const [isViewJob, setIsViewJob] = useState(false);
  const [singleJobData, setSingleJobData] = useState('');

  const setJobView = (job: any) => {
    setIsViewJob(true);
    setSingleJobData(job);
  };

  return { isViewJob, singleJobData, setJobView };
};