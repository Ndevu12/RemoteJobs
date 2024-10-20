import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserDummyJobData } from "../../../DummyData/userJobs";
import JobForm from "../../components/Froms/JobForm";
import { Job } from "../../lib/job";

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

export type ArrayKeys =
  | "requirements"
  | "qualifications"
  | "responsibilities"
  | "skills"
  | "benefits"
  | "role";

const UserJobsPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("postedJobs");
  const [jobs, setJobs] = useState<Job[]>(UserDummyJobData);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>(
    UserDummyJobData.filter(
      (job) => job.AppliedJobs && job.AppliedJobs.length > 0
    )
  );
  const [newJob, setNewJob] = useState<Job>({
    position: "",
    description: "",
    company: {
      name: "",
      logo: "",
      website: "",
      logoBackground: "",
    },
    contract: "",
    location: "",
    status: "open",
    requirements: { content: "", items: [""] },
    qualifications: { content: "", items: [""] },
    responsibilities: { content: "", items: [""] },
    skills: { content: "", items: [""] },
    benefits: { content: "", items: [""] },
    role: { content: "", items: [""] },
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth?type=login");
      return;
    }

    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
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
            toast.error("Failed to fetch jobs");
          }
        } catch (error) {
          toast.error("Something went wrong, Try again!");
        }
      }
    };

    fetchJobs();
  }, [isLoggedIn, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const nameParts: string[] = name.split(".");

    if (nameParts.length === 2) {
      setNewJob((prevState) => ({
        ...prevState,
        [nameParts[0]]: {
          ...(prevState[nameParts[0] as keyof Job] as any),
          [nameParts[1]]: value,
        },
      }));
    } else {
      setNewJob({ ...newJob, [name]: value });
    }
  };

  const handleArrayInputChange = (
    arrayName: ArrayKeys,
    index: number,
    value: string
  ) => {
    setNewJob((prevState) => {
      const updatedArray = [...prevState[arrayName].items];
      updatedArray[index] = value;
      return {
        ...prevState,
        [arrayName]: { ...prevState[arrayName], items: updatedArray },
      };
    });
  };

  const addArrayItem = (arrayName: ArrayKeys) => {
    setNewJob((prevState) => {
      const updatedArray = [...prevState[arrayName].items, ""];
      return {
        ...prevState,
        [arrayName]: { ...prevState[arrayName], items: updatedArray },
      };
    });
  };

  const removeArrayItem = (arrayName: ArrayKeys, index: number) => {
    setNewJob((prevState) => {
      const updatedArray = prevState[arrayName].items.filter(
        (_, i) => i !== index
      );
      return {
        ...prevState,
        [arrayName]: { ...prevState[arrayName], items: updatedArray },
      };
    });
  };

  const defaultJobKey = () => {
    return `${Math.random().toString(36).substr(2, 9)}`;
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const jobData = {
          company: {
            name: newJob.company.name,
            website: newJob.company.website,
            logo: newJob.company.logo,
            logoBackground: "#FFFFFF",
          },
          contract: newJob.contract,
          position: newJob.position,
          location: newJob.location,
          description: newJob.description,
          requirements: newJob.requirements,
          qualifications: newJob.qualifications,
          responsibilities: newJob.responsibilities,
          skills: newJob.skills,
          benefits: newJob.benefits,
          role: newJob.role,
          status: newJob.status,
          appliedJobs: [],
        };

        const response = await fetch(`${API_BASE_URL}/jobs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        });

        if (response.ok) {
          toast.success("Job posted successfully");
          const postedJob = await response.json();
          setJobs([...jobs, postedJob]);
          setNewJob({
            position: "",
            description: "",
            company: {
              name: "",
              logo: "",
              website: "",
              logoBackground: "",
            },
            contract: "",
            location: "",
            status: "open",
            requirements: { content: "", items: [""] },
            qualifications: { content: "", items: [""] },
            responsibilities: { content: "", items: [""] },
            skills: { content: "", items: [""] },
            benefits: { content: "", items: [""] },
            role: { content: "", items: [""] },
          });
        } else if (response.status === 400) {
          console.log("sent data: ", jobData);
          toast.error("Please enter valid inputs.");
        } else {
          toast.error("Failed to post job");
        }
      } catch (error) {
        toast.error("Something went wrong, Try again!");
      }
    }
  };

  const handleJobStatusChange = async (jobId: string, newStatus: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          toast.success("Job status updated successfully");
          setJobs(
            jobs.map((job) =>
              job.id === jobId ? { ...job, status: newStatus } : job
            )
          );
        } else {
          toast.error("Failed to update job status");
        }
      } catch (error) {
        toast.error("Something went wrong, Try again!");
      }
    }
  };

  const handleViewApplicants = (jobId: string) => {
    navigate(`/jobs/${jobId}/applicants`);
  };

  return (
    <div className="className='mt-7 mb-7 p-6 rounded-lg mx-auto max-w-4xl">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Jobs Page</h1>
      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === "postedJobs" ? "bg-blue-400 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("postedJobs")}
          >
            Posted Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "appliedJobs" ? "bg-blue-400 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("appliedJobs")}
          >
            Applied Jobs
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "postJob" ? "bg-blue-400 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("postJob")}
          >
            Post New Job
          </button>
        </div>
        {activeTab === "postedJobs" && (
          <div className="mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Jobs Statistics</h2>
            {jobs.length > 0 ? (
              <ul>
                {jobs.map((job) => (
                  <li key={defaultJobKey()} className="mb-4 border p-4 rounded">
                    <div className="flex items-center rounded mb-4">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-16 h-16 rounded mr-4"
                        style={{ backgroundColor: job.company.logoBackground }}
                      />
                      <div>
                        <p>
                          <strong>Company:</strong> {job.company.name}
                        </p>
                        <p>
                          <strong>Website:</strong>{" "}
                          <a
                            href={job.company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job.company.website}
                          </a>
                        </p>
                      </div>
                    </div>
                    <p>
                      <strong>Title:</strong> {job.position}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Posted At:</strong> {job.postedAt}
                    </p>
                    <p>
                      <strong>Contract:</strong> {job.contract}
                    </p>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p>
                      <strong>Status:</strong> {job.status}
                    </p>
                    <button
                      onClick={() =>
                        handleJobStatusChange(
                          job.id!,
                          job.status === "open" ? "closed" : "open"
                        )
                      }
                      className="bg-blue-400 text-white px-4 py-2 rounded mt-2"
                    >
                      {job.status === "open" ? "Close Job" : "Reopen Job"}
                    </button>
                    <button
                      onClick={() => handleViewApplicants(job.id!)}
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
        {activeTab === "appliedJobs" && (
          <div className="mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
            {appliedJobs && appliedJobs.length > 0 ? (
              <ul>
                {appliedJobs.map((job) => (
                  <li key={job.id} className="mb-4 border p-4 rounded">
                    <div className="flex items-center mb-4">
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-16 h-16 mr-4"
                        style={{ backgroundColor: job.company.logoBackground }}
                      />
                      <div>
                        <p>
                          <strong>Company:</strong> {job.company.name}
                        </p>
                        <p>
                          <strong>Website:</strong>{" "}
                          <a
                            href={job.company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job.company.website}
                          </a>
                        </p>
                      </div>
                    </div>
                    <p>
                      <strong>Title:</strong> {job.position}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Posted At:</strong> {job.postedAt}
                    </p>
                    <p>
                      <strong>Contract:</strong> {job.contract}
                    </p>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p>
                      <strong>Status:</strong> {job.status}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs applied for yet.</p>
            )}
          </div>
        )}
        {activeTab === "postJob" && (
          <div className="mt-5 mb-7 px-10 pt-5 border border-grey-700 rounded-lg mx-auto max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Post a New Job</h2>
            <JobForm
              job={newJob}
              onChange={handleInputChange}
              onArrayChange={handleArrayInputChange}
              onAddArrayItem={addArrayItem}
              onRemoveArrayItem={removeArrayItem}
              onSubmit={handlePostJob}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserJobsPage;
