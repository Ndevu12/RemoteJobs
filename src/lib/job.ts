export interface Job {
  _id?: string;
  position: string;
  description: string;
  company: {
    name: string;
    logo: string;
    website: string;
    logoBackground?: string;
  };
  contract: string;
  location: string;
  status: string;
  requirements: {
    content: string;
    items: string[];
  };
  qualifications: {
    content: string;
    items: string[];
  };
  responsibilities: {
    content: string;
    items: string[];
  };
  skills: {
    content: string;
    items: string[];
  };
  benefits: {
    content: string;
    items: string[];
  };
  role: {
    content: string;
    items: string[];
  };
  postedAt?: string;
  AppliedJobs?: any[];
}