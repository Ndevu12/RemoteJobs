import React from 'react';

interface ExperienceFormProps {
  experience: {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    userId: string;
    description: string;
  }[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  handleAddExperience: () => void;
  handleRemoveExperience: (index: number) => void;
  handleUpdateExperience: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  handleInputChange,
  handleAddExperience,
  handleRemoveExperience,
  handleUpdateExperience,
}) => {
  return (
    <form onSubmit={handleUpdateExperience} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      {experience.map((exp, index) => (
        <div key={index} className="mb-6">
          <label htmlFor={`jobTitle-${index}`} className="block text-gray-700 font-semibold mb-2">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={exp.jobTitle}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`company-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Company</label>
          <input
            type="text"
            name="company"
            value={exp.company}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`startDate-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={exp.startDate}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`endDate-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">End Date</label>
          <input
            type="date"
            name="endDate"
            value={exp.endDate}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`description-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Description</label>
          <textarea
            name="description"
            value={exp.description}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
            rows={4}
          />
          <button type="button" onClick={() => handleRemoveExperience(index)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddExperience} className="bg-blue-500 text-white px-4 py-2 rounded">Add Experience</button>
      <button type="submit" className="ml-4 bg-green-500 text-white px-4 py-2 rounded">Update Experience</button>
    </form>
  );
};

export default ExperienceForm;