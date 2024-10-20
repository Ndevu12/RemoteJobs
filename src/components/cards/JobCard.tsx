import React from "react";
import { MapPin } from 'lucide-react';
import transformTime from "../../utils/FormatTime";
import { truncateText } from "../../utils/truncateText";
import { JobType } from "../../pages/Jobs/JobsPage";

interface JobCardProps {
  job: JobType;
  onClick: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  const truncatedDescription = truncateText(job.description || "", 150); // Truncate to 100 characters

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white shadow-md rounded-md cursor-pointer" onClick={() => onClick(job.id!)}>
      <figure className="w-[30%] flex items-center justify-center rounded mb-4">
        <img src={job.company?.logo} alt={job.company?.name}/>
      </figure>
      <div className="job-time flex items-center text-gray-500 text-sm mb-2">
        <span>{transformTime(job.postedAt || "")}</span>
        <span className="mx-2">•</span>
        <span>{job.contract}</span>
      </div>
      <div className="job-position text-lg font-semibold mb-2">
        {job.position}
      </div>
      <div className="job-company text-gray-700 mb-2">
        <p>{truncatedDescription}</p>
      </div>
      <div className="job-location flex items-center text-gray-500">
        <MapPin className="mr-1" />
        <p>{job.location}</p>
      </div>
    </div>
  );
};

export default JobCard;