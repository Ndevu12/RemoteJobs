import React, { useEffect, useState } from "react";
import "../../styles/Jobs.css";
import Button from "../Buttons/Button";
import { PropagateLoader } from "react-spinners";
import transformTime from "../../utils/FormatTime";
import { toast } from "react-toastify";
import { Briefcase, MapPin } from 'lucide-react';
import { mockJobsData } from '../../../DummyData/Jobs';
interface props {
  filterData?: {
    title?: string;
    location?: string;
    fulltime?: string;
  };
  setIsViewJob: (value: any, mode: string) => void;
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

const API_BASE_URL = (import.meta as any).env.REACT_APP_API_BASE_URL;

const Jobs = (props: props) => {
  const [loading, setLoading] = useState(true);
  const [jobsData, setJobsData] = useState<JobType[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/jobs`);

        if (response.ok) {
          const jobs: JobType[] = (await response.json()).jobs;

          if (
            props.filterData &&
            (props.filterData.title ||
              props.filterData.location ||
              props.filterData.fulltime)
          ) {
            const result = [];
            for (let i = 0; i < jobs.length; i++) {
              if (
                jobs[i].location!.toLocaleLowerCase() ===
                props.filterData.location!.toLocaleLowerCase()
              ) {
                result.push(jobs[i]);
              }
              if (
                jobs[i].position!.toLocaleLowerCase() ===
                props.filterData.title!.toLocaleLowerCase()
              ) {
                result.push(jobs[i]);
              }
              if (
                jobs[i].contract!.toLocaleLowerCase() ===
                (props.filterData.fulltime === "on" ? "full time" : "part time")
              ) {
                result.push(jobs[i]);
              }
            }

            setJobsData([...Array.from(new Set(result))]);
            return;
          }

          setJobsData([...jobs]);
        } else {
          setJobsData(mockJobsData);
        }
      } catch (error: any) {
        toast.error(`Error fetching jobs: ${error.message}`);
        setJobsData(mockJobsData);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [props.filterData]);

  const jobViewHandler = (event: React.MouseEvent) => {
    const jobId = (event.currentTarget as HTMLElement).getAttribute("id")!;

    for (const job of jobsData) {
      if (job.id === jobId) {
        props.setIsViewJob(job, "view");
      }
    }
  };

  return (
    <div className="jobs">
      {jobsData.length ? (
        jobsData!.map((job) => {
          return (
            <div key={job.id} className="job">
              <figure
                style={{ backgroundColor: job.company!.logoBackground }}
                className="company--photo"
              >
                <Briefcase />
              </figure>
              <div className="job__time">
                <span className="job__postedat">
                  {transformTime(job.postedAt || "")}
                </span>
                <span className="job__time_separator"></span>
                <span className="job__contract">{job.contract}</span>
              </div>
              <div className="job__position">
                <span onClick={jobViewHandler} id={String(job.id)}>
                  {job.position}
                </span>
              </div>
              <div className="job__company">
                <p>{job.company?.name}</p>
              </div>
              <div className="job__location">
                <MapPin />
                <p>{job.location}</p>
              </div>
            </div>
          );
        })
      ) : loading ? (
        <div>
          <PropagateLoader color="#5964e0" />
        </div>
      ) : (
        <p>No jobs found</p>
      )}
      {jobsData.length > 10 && (
        <div className="jobs--lod-more">
          <Button className="jobs--btn" text="Load More" />
        </div>
      )}
    </div>
  );
};

export default Jobs;