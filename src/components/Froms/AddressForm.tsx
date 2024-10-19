import React from 'react';

interface AddressFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProfile: (event: React.FormEvent<HTMLFormElement>) => void;
  setEditMode: (editMode: boolean) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ formData, handleInputChange, handleUpdateProfile, setEditMode }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-4 border border-gray-100 pt-3 rounded pb-10">
      <form onSubmit={handleUpdateProfile} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="street" className="block text-gray-700">Street</label>
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.address.zipCode}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded bg-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded bg-white"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
        <button type="button" onClick={() => setEditMode(false)} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </form>
    </div>
  );
};

export default AddressForm;