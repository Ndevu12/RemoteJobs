import React from 'react';
import { Job } from '../lib/job';
import ArrayField from './ArrayField/ArrayField';

type ArrayKeys = 'requirements' | 'qualifications' | 'responsibilities' | 'skills' | 'benefits' | 'role';

interface JobFormProps {
  job: Job;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onArrayChange: (arrayName: ArrayKeys, index: number, value: string) => void;
  onAddArrayItem: (arrayName: ArrayKeys) => void;
  onRemoveArrayItem: (arrayName: ArrayKeys, index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const JobForm: React.FC<JobFormProps> = ({ job, onChange, onArrayChange, onAddArrayItem, onRemoveArrayItem, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="mb-4">
      <div className="mb-4">
        <label htmlFor="position" className="block text-gray-700">Job Position</label>
        <input
          type="text"
          name="position"
          value={job.position}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Job Description</label>
        <textarea
          name="description"
          value={job.description}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="company" className="block text-gray-700">Company Name</label>
        <input
          type="text"
          name="company"
          value={job.company.name}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="logo" className="block text-gray-700">Company Logo URL</label>
        <input
          type="text"
          name="logo"
          value={job.company.logo}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="url" className="block text-gray-700">Company Website URL</label>
        <input
          type="text"
          name="url"
          value={job.company.website}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="contract" className="block text-gray-700">Contract Type</label>
        <input
          type="text"
          name="contract"
          value={job.contract}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={job.location}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="requirements.content" className="block text-gray-700">Requirements Content</label>
        <textarea
          name="requirements.content"
          value={job.requirements.content}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <ArrayField
        label="Requirements Items"
        items={job.requirements.items}
        onAddItem={() => onAddArrayItem('requirements')}
        onRemoveItem={(index) => onRemoveArrayItem('requirements', index)}
        onChangeItem={(index, value) => onArrayChange('requirements', index, value)}
      />
      <div className="mb-4">
        <label htmlFor="qualifications.content" className="block text-gray-700">Qualifications Content</label>
        <textarea
          name="qualifications.content"
          value={job.qualifications.content}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <ArrayField
        label="Qualifications Items"
        items={job.qualifications.items}
        onAddItem={() => onAddArrayItem('qualifications')}
        onRemoveItem={(index) => onRemoveArrayItem('qualifications', index)}
        onChangeItem={(index, value) => onArrayChange('qualifications', index, value)}
      />
      <div className="mb-4">
        <label htmlFor="responsibilities.content" className="block text-gray-700">Responsibilities Content</label>
        <textarea
          name="responsibilities.content"
          value={job.responsibilities.content}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <ArrayField
        label="Responsibilities Items"
        items={job.responsibilities.items}
        onAddItem={() => onAddArrayItem('responsibilities')}
        onRemoveItem={(index) => onRemoveArrayItem('responsibilities', index)}
        onChangeItem={(index, value) => onArrayChange('responsibilities', index, value)}
      />
      <div className="mb-4">
        <label htmlFor="skills.content" className="block text-gray-700">Skills Content</label>
        <textarea
          name="skills.content"
          value={job.skills.content}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <ArrayField
        label="Skills Items"
        items={job.skills.items}
        onAddItem={() => onAddArrayItem('skills')}
        onRemoveItem={(index) => onRemoveArrayItem('skills', index)}
        onChangeItem={(index, value) => onArrayChange('skills', index, value)}
      />
      <div className="mb-4">
        <label htmlFor="benefits.content" className="block text-gray-700">Benefits Content</label>
        <textarea
          name="benefits.content"
          value={job.benefits.content}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <ArrayField
        label="Benefits Items"
        items={job.benefits.items}
        onAddItem={() => onAddArrayItem('benefits')}
        onRemoveItem={(index) => onRemoveArrayItem('benefits', index)}
        onChangeItem={(index, value) => onArrayChange('benefits', index, value)}
      />
      <div className="mb-4">
        <label htmlFor="role.content" className="block text-gray-700">Role Content</label>
        <textarea
          name="role.content"
          value={job.role.content}
          onChange={onChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <ArrayField
        label="Role Items"
        items={job.role.items}
        onAddItem={() => onAddArrayItem('role')}
        onRemoveItem={(index) => onRemoveArrayItem('role', index)}
        onChangeItem={(index, value) => onArrayChange('role', index, value)}
      />
      <button type="submit" className="bg-blue-400 text-white px-4 py-2 rounded">Post Job</button>
    </form>
  );
};

export default JobForm;