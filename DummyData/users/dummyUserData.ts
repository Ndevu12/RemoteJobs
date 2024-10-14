import { userIconUrl } from "../../src/assets/images/images";

export const dummyUserData = {
  account: {
    _id: { "$oid": "670d619cba23872288152b62" },
    profileImage: userIconUrl,
    name: "John Doe",
    email: "john.doe@example.com",
    occupation: "Software Engineer",
    phone: "+1-555-555-5555",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "USA",
    },
    company: [
      { "$oid": "670c194c0f09b3416d5a6d72" }
    ],
    password: "$2a$10$AebymRSaQpVvt6Absyi3C.qbWo5hpk3KTmfSrssQGj74JcDwm6mfu",
    role: "user",
    appliedJobs: [
      { "$oid": "670c170ca6260f596823a232" },
      { "$oid": "670c1755cce0e10ec98a2edb" }
    ],
    education: [
      {
        _id: { "$oid": "670c19b4f4758894c56166aa" },
        institution: "University of Example",
        degree: "Bachelor of Science in Computer Science",
        year: "2020"
      }
    ],
    experience: [
      {
        _id: { "$oid": "670c1af2b93fef838ae8d679" },
        company: "Tech Solutions Inc.",
        role: "Software Engineer",
        duration: "2 years"
      }
    ],
    skills: [
      {
        _id: { "$oid": "670c10659d22c26d32cc3f45" },
        name: "JavaScript"
      },
      {
        _id: { "$oid": "670c10659d22c26d32cc3f46" },
        name: "React"
      }
    ],
    __v: { "$numberInt": "0" }
  },
};