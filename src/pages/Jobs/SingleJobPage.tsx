import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import transformTime from "../../utils/FormatTime";
import Button2 from "../../components/Buttons/Button2";
import Button from "../../components/Buttons/Button";
import { PropagateLoader } from "react-spinners";
import { dummyJobData } from "../../../DummyData/detailedJob";
import Modal from 'react-modal';

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const SingleJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [jobData, setJobData] = useState<any>(null);
  const [applyText, setApplyText] = useState("Apply Now");
  const [btnDisable, setBtnDisable] = useState(true);
  const [btnLoading, setBtnLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
        if (response.ok) {
          const job = await response.json();
          setJobData(job);
        } else {
          toast.error("Failed to fetch job data");
          setJobData(dummyJobData);
        }
      } catch (error) {
        toast.error("Something went wrong, Try again!");
        setJobData(dummyJobData);
      }
    };

    fetchJobData();
  }, [jobId]);

  const companyWebsiteHandler = () => {
    const website = jobData.company.website;
    const formattedWebsite = website.startsWith("http") ? website : `https://${website}`;
    window.open(formattedWebsite, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/account`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const account = (await response.json()).account;
            const hasApplied = jobData.AppliedJobs.some((appliedJob: any) => appliedJob.userId === account.id);
            if (hasApplied) {
              setApplyText("Applied");
            }
          }
        } catch (error) {
          toast.error("Error fetching account info");
        }
      }
      setBtnDisable(false);
      setBtnLoading(false);
    };
    if (jobData) {
      fetchAccountInfo();
    }
  }, [jobData]);

  const applyNowHandler = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Login is required");
      navigate('/auth?type=login');
      return;
    }
    setIsModalOpen(true);
  };

  const handleUseProfileCV = async () => {
    setIsModalOpen(false);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/apply/${jobData.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Successfully applied for the job");
        setApplyText("Applied");
      } else {
        throw new Error("Failed to apply for the job");
      }
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadCV = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("cv", selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/jobs/apply/${jobData.id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Successfully applied for the job");
        setApplyText("Applied");
      } else {
        throw new Error("Failed to apply for the job");
      }
    } catch (error) {
      toast.error("Something went wrong, Try again!");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (!jobData) {
    return <div className="flex justify-center items-center h-64"><PropagateLoader color="#5964e0" /></div>;
  }

  return (
    <div className="bg-white mt-5 mb-7 p-6 border border-grey-700 rounded-lg shadow-lg mx-auto max-w-4xl">
      <div className="flex flex-col items-center justify-center mb-6">
        <figure
          style={{ backgroundColor: jobData.company.logoBackground }}
          className="job-view__company_logo w-24 h-24 flex items-center justify-center rounded-full mb-4"
        >
          <img src={`${jobData.company.logo}`} alt="Company Logo" className="w-full h-full object-cover rounded-full" />
        </figure>
        <div className="company--website flex flex-col items-center">
          <p className="company--name text-2xl font-semibold mb-2">{jobData.company.name}</p>
          <p className="company--web-link text-blue-400 cursor-pointer mb-2" onClick={companyWebsiteHandler}>
            {jobData.company.name.toLowerCase()}.com
          </p>
          <Button2 className="mt-2" text="Company Site" onClick={companyWebsiteHandler} />
        </div>
      </div>
      {/* Title and starting point */}
      <div className="flex flex-wrap justify-between p-6 items-center border border-grey-700 rounded md:grid-cols-2">
        <div>
          <div className="job__time flex items-center text-gray-500 text-sm mb-2">
            <span>{transformTime(jobData.postedAt)}</span>
            <span className="mx-2">•</span>
            <span>{jobData.contract}</span>
          </div>
          <p className="job-view__position text-2xl font-semibold mb-2">{jobData.position}</p>
          <p className="job-view__location text-gray-500 mb-4">{jobData.location}</p>
        </div>
        <div className="flex items-center justify-end">
          <Button
            className="job__time_btn"
            text={applyText}
            loading={btnLoading}
            disabled={btnDisable}
            onClick={applyNowHandler}
          />
        </div>
      </div>
      {/* END of Title and starting point */}
      <div className="flex flex-wrap justify-center items-center px-20 mt-7">
        <div className="job_view__description grid grid-cols-1 gap-6 mb-6">
          <div className="job--view__main_description mb-4">
            <h3 className="text-xl font-semibold mb-2">Job Description</h3>
            <p>{jobData.description}</p>
          </div>
          <div className="job-view__requirement mb-4">
            <h3 className="text-xl font-semibold mb-2">Requirements</h3>
            <p className="mb-2">{jobData.requirements.content}</p>
            <ul className="list-disc list-inside">
              {jobData.requirements.items.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="job-view__qualifications mb-4">
            <h3 className="text-xl font-semibold mb-2">Qualifications</h3>
            <p className="mb-2">{jobData.qualifications.content}</p>
            <ul className="list-disc list-inside">
              {jobData.qualifications.items.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="job-view__responsibilities mb-4">
            <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
            <p className="mb-2">{jobData.responsibilities.content}</p>
            <ul className="list-disc list-inside">
              {jobData.responsibilities.items.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="job-view__skills mb-4">
            <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
            <p className="mb-2">{jobData.skills.content}</p>
            <ul className="list-disc list-inside">
              {jobData.skills.items.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="job-view__benefits mb-4">
            <h3 className="text-xl font-semibold mb-2">Benefits</h3>
            <p className="mb-2">{jobData.benefits.content}</p>
            <ul className="list-disc list-inside">
              {jobData.benefits.items.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="job-view__to_do">
            <h3 className="text-xl font-semibold mb-2">What You Will Do</h3>
            <p className="mb-2">{jobData.role.content}</p>
            <ol className="list-decimal list-inside">
              {jobData.role.items.map((item: any, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between p-6 items-center border border-grey-700 rounded">
        <div>
          <h3 className="text-xl font-semibold mb-2">{jobData.position}</h3>
          <p className="text-gray-500 mb-4">{jobData.company.name}</p>
        </div>
        <Button
          className="job__time_btn"
          text={applyText}
          loading={btnLoading}
          disabled={btnDisable}
          onClick={applyNowHandler}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Apply for Job"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Apply for {jobData.position}</h2>
          <p className="mb-4">Would you like to use your CV from your profile or upload a new CV?</p>
          <div className="flex justify-between">
            <Button2 text="Use Profile CV" onClick={handleUseProfileCV} className="mr-2" />
            <Button2 text="Upload New CV" onClick={() => document.getElementById('file-upload')?.click()} className="ml-2" />
          </div>
          <input
            type="file"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="mt-4">
              <p>Selected file: {selectedFile.name}</p>
              <Button2 text="Upload CV and Apply" onClick={handleUploadCV} className="mt-2" />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SingleJobPage;