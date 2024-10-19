import React from 'react';

interface EducationFormProps {
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    userId: string;
    description: string;
  }[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  handleAddEducation: () => void;
  handleRemoveEducation: (index: number) => void;
  handleUpdateEducation: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  education,
  handleInputChange,
  handleAddEducation,
  handleRemoveEducation,
  handleUpdateEducation,
}) => {
  return (
    <form onSubmit={handleUpdateEducation} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      {education.map((edu, index) => (
        <div key={index} className="mb-6">
          <label htmlFor={`institution-${index}`} className="block text-gray-700 font-semibold mb-2">Institution</label>
          <input
            type="text"
            name="institution"
            value={edu.institution}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`degree-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Degree</label>
          <input
            type="text"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`startDate-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={edu.startDate}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`endDate-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">End Date</label>
          <input
            type="date"
            name="endDate"
            value={edu.endDate}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`description-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Description</label>
          <textarea
            name="description"
            value={edu.description}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
            rows={4}
          />
          <button type="button" onClick={() => handleRemoveEducation(index)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddEducation} className="bg-blue-500 text-white px-4 py-2 rounded">Add Education</button>
      <button type="submit" className="ml-4 bg-green-500 text-white px-4 py-2 rounded">Update Education</button>
    </form>
  );
};

export default EducationForm;