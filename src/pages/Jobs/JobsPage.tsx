import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { useFetchJobs } from "../../action/useFetchJobs";
import JobCard from "../../components/cards/JobCard";
import UserReviews from "../../components/Review/UserReviews";
import Button from "../../components/Buttons/Button";

interface Props {
  filterData?: {
    title?: string;
    location?: string;
    fulltime?: string;
  };
}

export interface CompanyType {
  name?: string;
  logo?: string;
  logoBackground?: string;
  website?: string;
}

export interface JobType {
  id?: string;
  position?: string;
  postedAt?: string;
  contract?: string;
  location?: string;
  apply?: string;
  description?: string;
  companyId?: string;
  company?: CompanyType;
}

const JobsPage: React.FC<Props> = ({ filterData }) => {
  const { loading, jobsData } = useFetchJobs(filterData);
  const [visibleJobs, setVisibleJobs] = useState(9);
  const navigate = useNavigate();
  const [sortedJobs, setSortedJobs] = useState<JobType[]>([]);

  useEffect(() => {
    if (jobsData.length) {
      const sorted = [...jobsData].sort((a, b) => {
        const dateA = new Date(a.postedAt || "").getTime();
        const dateB = new Date(b.postedAt || "").getTime();
        return dateB - dateA;
      });
      setSortedJobs(sorted);
    }
  }, [jobsData]);

  const loadMoreJobs = () => {
    setVisibleJobs((prev) => prev + 10);
  };

  const jobViewHandler = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  const defaultJobKey = () =>{
    return `job-${Math.random().toString(36).substr(2, 9)}`;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-6 ">
      <div className="jobs-page w-[80%] p-4">
        <div className="text-lg font-semibold mb-6">Recent Jobs</div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <PropagateLoader color="#5964e0" />
          </div>
        ) : sortedJobs.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedJobs.slice(0, visibleJobs).map((job) => (
              <JobCard key={job.id || defaultJobKey()} job={job} onClick={jobViewHandler} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No jobs found</p>
        )}
        {sortedJobs.length > visibleJobs && (
          <div className="flex justify-center mt-4">
            <Button
              className="job__time_btn"
              text={'Load more jobs'}
              onClick={loadMoreJobs}
            />
          </div>
        )}
      </div>
      <UserReviews />
    </div>
  );
};

export default JobsPage;