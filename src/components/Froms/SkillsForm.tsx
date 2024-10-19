import React from 'react';

interface SkillsFormProps {
  skills: {
    name: string;
    userId: string;
    description: string;
    proficiency: string;
  }[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  handleAddSkill: () => void;
  handleRemoveSkill: (index: number) => void;
  handleUpdateSkills: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  handleInputChange,
  handleAddSkill,
  handleRemoveSkill,
  handleUpdateSkills,
}) => {
  return (
    <form onSubmit={handleUpdateSkills} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
      {skills.map((skill, index) => (
        <div key={index} className="mb-6">
          <label htmlFor={`name-${index}`} className="block text-gray-700 font-semibold mb-2">Skill Name</label>
          <input
            type="text"
            name="name"
            value={skill.name}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <label htmlFor={`description-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Description</label>
          <textarea
            name="description"
            value={skill.description}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
            rows={4}
          />
          <label htmlFor={`proficiency-${index}`} className="block text-gray-700 font-semibold mb-2 mt-4">Proficiency</label>
          <input
            type="text"
            name="proficiency"
            value={skill.proficiency}
            onChange={(e) => handleInputChange(e, index)}
            className="mt-1 p-2 w-full border rounded"
          />
          <button type="button" onClick={() => handleRemoveSkill(index)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddSkill} className="bg-blue-500 text-white px-4 py-2 rounded">Add Skill</button>
      <button type="submit" className="ml-4 bg-green-500 text-white px-4 py-2 rounded">Update Skills</button>
    </form>
  );
};

export default SkillsForm;