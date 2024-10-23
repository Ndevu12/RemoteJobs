# RemoteJobs# RemoteJobs

RemoteJobs is a web application designed to help users find and apply for remote job opportunities. The application allows companies to post job listings and users to browse and apply for these jobs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Job Listings**: Browse remote job opportunities posted by various companies.
- **Job Application**: Apply for jobs directly through the platform.
- **Company Profiles**: Companies can create profiles and post job listings.
- **User Profiles**: Users can create profiles, upload resumes, and track their job applications.
- **Search and Filter**: Search and filter job listings based on various criteria such as location, job type, and company.

## N.B: All APIs are not implemented.

## Installation

To get started with RemoteJobs, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/remotejobs.git
   cd remotejobs
   ```

2. **Install dependencies**:

```bash
yarn install
```

3. **Set up environment variables**: 

Create a .env file in the root directory and add the necessary environment variables:

```bash
REACT_APP_API_BASE_URL=http://localhost:3000
```

4. **Start the development server:**

```bash
yarn build
```

5. **Run the backend server**: Navigate to the backend directory and start the server

```bash
cd backend
yarn install
yarn dev
```

## Usage

Once the application is up and running, you can access it at http://localhost:3000.

### For Users

1. **Sign Up**: Create a new account.
2. **Browse Jobs**: Browse the available job listings.
3. **Apply for Jobs**: Apply for jobs that match your skills and interests.
4. **Track Applications**: Track the status of your job applications.

### For Recruiters

1. **Sign Up**: Create a new company account.
2. **Create Profile**: Set up your company profile.
3. **Post Jobs**: Post new job listings.
4. **Manage Applications**: Review and manage applications from potential candidates.

## API Endpoints

### Authentication

- **POST /auth/signup**: Register a new user or company.
- **POST /auth/login**: Log in a user or company.

### Jobs

- **GET /jobs**: Retrieve a list of job listings.
- **POST /jobs**: Create a new job listing (company only).
- **GET /jobs/:id**: Retrieve details of a specific job listing.
- **PUT /jobs/:id**: Update a job listing (company only).
- **DELETE /jobs/:id**: Delete a job listing (company only).


## Applications

- **POST /apply/new**: Apply for a job (user only) with a new CV.
- **POST /apply/exis**: Apply for a job (user only) with the existing CV.
- **GET /applications**: Retrieve a list of applications (user only).
- **GET /applications/:id**: Retrieve details of a specific application (user only).

## Contributing

We welcome contributions to the RemoteJobs project! To contribute, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**.
4. **Commit your changes**:

```bash
git commit -m 'Add some feature'
```

5. **Push to the branch**:

```bash
git push origin feature/your-feature-name
```

6. **Create a pull request**.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

