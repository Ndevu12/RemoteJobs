import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PropagateLoader } from 'react-spinners';

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const ApplicantsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/applicants`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setApplicants(data.applicants);
          } else {
            toast.error('Failed to fetch applicants');
          }
        } catch (error) {
          toast.error('Something went wrong, Try again!');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><PropagateLoader color="#5964e0" /></div>;
  }

  return (
    <div className="bg-white mt-7 mb-7 p-6 border border-grey-700 rounded-lg shadow-lg mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Applicants for Job with this ID: {jobId}</h1>
      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <ul>
          {applicants.map(applicant => (
            <li key={applicant.id} className="mb-4 p-4 border border-grey-300 rounded">
              <p><strong>Name:</strong> {applicant.name}</p>
              <p><strong>Email:</strong> {applicant.email}</p>
              <p><strong>Resume:</strong> <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a></p>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-4 bg-blue-400 text-white px-4 py-2 rounded"
        onClick={() => navigate(-1)}
      >
        Back to Jobs
      </button>
    </div>
  );
};

export default ApplicantsPage;