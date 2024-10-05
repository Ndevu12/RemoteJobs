import { userIconUrl } from "../../src/assets/images/images";

export const dummyUserData = {
  account: {
    id: "12345",
    profileImage: userIconUrl,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-555-5555",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
    company: {
      name: "Tech Solutions Inc.",
      website: "www.techsolutions.com",
      logo: "https://via.placeholder.com/150",
      logoBackground: "#f0f0f0",
    },
    AppliedJobs: [
      {
        jobId: "job123",
        position: "Software Engineer",
        company: "Tech Solutions Inc.",
        appliedAt: "2023-01-01T12:00:00Z",
      },
      {
        jobId: "job456",
        position: "Frontend Developer",
        company: "Web Innovations LLC",
        appliedAt: "2023-02-15T08:30:00Z",
      },
    ],
  },
};