import React from 'react';
import { useLocation } from 'react-router-dom';
import { UserDummyJobData } from '../../../DummyData/userJobs';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const title = query.get('title') || '';

  const filteredJobs = UserDummyJobData.filter(job => job.position.toLowerCase().includes(title.toLowerCase()));

  return (
    <div className="mt-5 mb-7 p-6 border border-grey-700 rounded-lg mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Search Results for {title}</h1>
      {filteredJobs.length > 0 ? (
        <ul>
          {filteredJobs.map(job => (
            <li key={job.id} className="mb-4 border p-4 rounded">
              <div className="flex items-center mb-4">
                <img src={job.company.logo} alt={job.company.name} className="w-16 h-16 mr-4" style={{ backgroundColor: job.company.logoBackground }} />
                <div>
                  <p><strong>Company:</strong> {job.company.name}</p>
                  <p><strong>Website:</strong> <a href={job.company.website} target="_blank" rel="noopener noreferrer">{job.company.website}</a></p>
                </div>
              </div>
              <p><strong>Title:</strong> {job.position}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Posted At:</strong> {job.postedAt}</p>
              <p><strong>Contract:</strong> {job.contract}</p>
              <p><strong>Description:</strong> {job.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs found for the given title.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;