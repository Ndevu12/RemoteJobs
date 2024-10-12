import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserDummyJobData } from '../../../DummyData/userJobs';
import ArrayField from '../../components/ArrayField/ArrayField';

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const UserJobsPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('postedJobs');
  const [jobs, setJobs] = useState<any[]>(UserDummyJobData);
  const [appliedJobs, setAppliedJobs] = useState<any[]>(UserDummyJobData.filter(job => job.AppliedJobs.length > 0));
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    company: '',
    logo: '',
    url: '',
    contract: '',
    location: '',
    status: 'open',
    requirements: { content: '', items: [''] },
    qualifications: { content: '', items: [''] },
    responsibilities: { content: '', items: [''] },
    skills: { content: '', items: [''] },
    benefits: { content: '', items: [''] },
    role: { content: '', items: [''] },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth?type=login');
      return;
    }

    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/jobs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setJobs(data.jobs);
            setAppliedJobs(data.appliedJobs);
          } else {
            toast.error('Failed to fetch jobs');
          }
        } catch (error) {
          toast.error('Something went wrong, Try again!');
        }
      }
    };

    fetchJobs();
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleArrayInputChange = (arrayName: string, index: number, value: string) => {
    setNewJob(prevState => {
      const updatedArray = [...prevState[arrayName].items];
      updatedArray[index] = value;
      return { ...prevState, [arrayName]: { ...prevState[arrayName], items: updatedArray } };
    });
  };

  const addArrayItem = (arrayName: string) => {
    setNewJob(prevState => {
      const updatedArray = [...prevState[arrayName].items, ''];
      return { ...prevState, [arrayName]: { ...prevState[arrayName], items: updatedArray } };
    });
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    setNewJob(prevState => {
      const updatedArray = prevState[arrayName].items.filter((_, i) => i !== index);
      return { ...prevState, [arrayName]: { ...prevState[arrayName], items: updatedArray } };
    });
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newJob),
        });

        if (response.ok) {
          toast.success('Job posted successfully');
          const postedJob = await response.json();
          setJobs([...jobs, postedJob]);
          setNewJob({
            title: '',
            description: '',
            company: '',
            logo: '',
            url: '',
            contract: '',
            location: '',
            status: 'open',
            requirements: { content: '', items: [''] },
            qualifications: { content: '', items: [''] },
            responsibilities: { content: '', items: [''] },
            skills: { content: '', items: [''] },
            benefits: { content: '', items: [''] },
            role: { content: '', items: [''] },
          });
        } else {
          toast.error('Failed to post job');
        }
      } catch (error) {
        toast.error('Something went wrong, Try again!');
      }
    }
  };

  const handleJobStatusChange = async (jobId: string, newStatus: string) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          toast.success('Job status updated successfully');
          setJobs(jobs.map(job => job.id === jobId ? { ...job, status: newStatus } : job));
        } else {
          toast.error('Failed to update job status');
        }
      } catch (error) {
        toast.error('Something went wrong, Try again!');
      }
    }
  };

  const handleViewApplicants = (jobId: string) => {
    navigate(`/jobs/${jobId}/applicants`);
  };

  return (
    <div className="className='mt-7 mb-7 p-6 rounded-lg mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-4">Jobs Page</h1>
      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'postedJobs' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('postedJobs')}
          >
            Posted Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'appliedJobs' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('appliedJobs')}
          >
            Applied Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'postJob' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('postJob')}
          >
            Post New Job
          </button>
        </div>
        {activeTab === 'postedJobs' && (
          <div className='mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl'>
            <h2 className="text-xl font-bold mb-4">Jobs Statistics</h2>
            {jobs.length > 0 ? (
              <ul>
                {jobs.map(job => (
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
                    <p><strong>Status:</strong> {job.status}</p>
                    <button
                      onClick={() => handleJobStatusChange(job.id, job.status === 'open' ? 'closed' : 'open')}
                      className="bg-blue-400 text-white px-4 py-2 rounded mt-2"
                    >
                      {job.status === 'open' ? 'Close Job' : 'Reopen Job'}
                    </button>
                    <button
                      onClick={() => handleViewApplicants(job.id)}
                      className="bg-green-400 text-white px-4 py-2 rounded mt-2 ml-2"
                    >
                      View Applicants
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs posted yet.</p>
            )}
          </div>
        )}
        {activeTab === 'appliedJobs' && (
          <div className='mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl'>
            <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
            {appliedJobs.length > 0 ? (
              <ul>
                {appliedJobs.map(job => (
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
                    <p><strong>Status:</strong> {job.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs applied for yet.</p>
            )}
          </div>
        )}
        {activeTab === 'postJob' && (
          <div className='mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl'>
            <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
            <form onSubmit={handlePostJob} className="mb-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Job Description</label>
                <textarea
                  name="description"
                  value={newJob.description}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={newJob.company}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="logo" className="block text-gray-700">Company Logo URL</label>
                <input
                  type="text"
                  name="logo"
                  value={newJob.logo}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="url" className="block text-gray-700">Company Website URL</label>
                <input
                  type="text"
                  name="url"
                  value={newJob.url}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contract" className="block text-gray-700">Contract Type</label>
                <input
                  type="text"
                  name="contract"
                  value={newJob.contract}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newJob.location}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="requirements.content" className="block text-gray-700">Requirements Content</label>
                <textarea
                  name="requirements.content"
                  value={newJob.requirements.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <ArrayField
                label="Requirements Items"
                items={newJob.requirements.items}
                onAddItem={() => addArrayItem('requirements')}
                onRemoveItem={(index) => removeArrayItem('requirements', index)}
                onChangeItem={(index, value) => handleArrayInputChange('requirements', index, value)}
              />
              <div className="mb-4">
                <label htmlFor="qualifications.content" className="block text-gray-700">Qualifications Content</label>
                <textarea
                  name="qualifications.content"
                  value={newJob.qualifications.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <ArrayField
                label="Qualifications Items"
                items={newJob.qualifications.items}
                onAddItem={() => addArrayItem('qualifications')}
                onRemoveItem={(index) => removeArrayItem('qualifications', index)}
                onChangeItem={(index, value) => handleArrayInputChange('qualifications', index, value)}
              />
              <div className="mb-4">
                <label htmlFor="responsibilities.content" className="block text-gray-700">Responsibilities Content</label>
                <textarea
                  name="responsibilities.content"
                  value={newJob.responsibilities.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <ArrayField
                label="Responsibilities Items"
                items={newJob.responsibilities.items}
                onAddItem={() => addArrayItem('responsibilities')}
                onRemoveItem={(index) => removeArrayItem('responsibilities', index)}
                onChangeItem={(index, value) => handleArrayInputChange('responsibilities', index, value)}
              />
              <div className="mb-4">
                <label htmlFor="skills.content" className="block text-gray-700">Skills Content</label>
                <textarea
                  name="skills.content"
                  value={newJob.skills.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <ArrayField
                label="Skills Items"
                items={newJob.skills.items}
                onAddItem={() => addArrayItem('skills')}
                onRemoveItem={(index) => removeArrayItem('skills', index)}
                onChangeItem={(index, value) => handleArrayInputChange('skills', index, value)}
              />
              <div className="mb-4">
                <label htmlFor="benefits.content" className="block text-gray-700">Benefits Content</label>
                <textarea
                  name="benefits.content"
                  value={newJob.benefits.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <ArrayField
                label="Benefits Items"
                items={newJob.benefits.items}
                onAddItem={() => addArrayItem('benefits')}
                onRemoveItem={(index) => removeArrayItem('benefits', index)}
                onChangeItem={(index, value) => handleArrayInputChange('benefits', index, value)}
              />
              <div className="mb-4">
                <label htmlFor="role.content" className="block text-gray-700">Role Content</label>
                <textarea
                  name="role.content"
                  value={newJob.role.content}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <ArrayField
                label="Role Items"
                items={newJob.role.items}
                onAddItem={() => addArrayItem('role')}
                onRemoveItem={(index) => removeArrayItem('role', index)}
                onChangeItem={(index, value) => handleArrayInputChange('role', index, value)}
              />
              <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded">Post Job</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserJobsPage;