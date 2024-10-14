import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { dummyUserData } from '../../../DummyData/users/dummyUserData';
import Button from '../../components/Buttons/Button';

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const ProfilePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth?type=login');
      return;
    }

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/account`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data.account);
            setFormData({
              name: data.account.name,
              email: data.account.email,
              phone: data.account.phone,
              address: `${data.account.address.street}, ${data.account.address.city}, ${data.account.address.state}, ${data.account.address.zip}, ${data.account.address.country}`,
            });
            localStorage.setItem('userData', JSON.stringify(data.account));
          } else {
            toast.error('Failed to fetch user data');
            const localData = localStorage.getItem('userData');
            if (localData) {
              const parsedData = JSON.parse(localData);
              setUserData(parsedData);
              setFormData({
                name: parsedData.name,
                email: parsedData.email,
                phone: parsedData.phone,
                address: `${parsedData.address.street}, ${parsedData.address.city}, ${parsedData.address.state}, ${parsedData.address.zip}, ${parsedData.address.country}`,
              });
            } else {
              setUserData(dummyUserData.account); // Use dummy data
              setFormData({
                name: dummyUserData.account.name,
                email: dummyUserData.account.email,
                phone: dummyUserData.account.phone,
                address: `${dummyUserData.account.address.street}, ${dummyUserData.account.address.city}, ${dummyUserData.account.address.state}, ${dummyUserData.account.address.zip}, ${dummyUserData.account.address.country}`,
              });
            }
          }
        } catch (error) {
          toast.error('Something went wrong, Try again!');
          const localData = localStorage.getItem('userData');
          if (localData) {
            const parsedData = JSON.parse(localData);
            setUserData(parsedData);
            setFormData({
              name: parsedData.name,
              email: parsedData.email,
              phone: parsedData.phone,
              address: `${parsedData.address.street}, ${parsedData.address.city}, ${parsedData.address.state}, ${parsedData.address.zip}, ${parsedData.address.country}`,
            });
          } else {
            setUserData(dummyUserData.account); // Use dummy data
            setFormData({
              name: dummyUserData.account.name,
              email: dummyUserData.account.email,
              phone: dummyUserData.account.phone,
              address: `${dummyUserData.account.address.street}, ${dummyUserData.account.address.city}, ${dummyUserData.account.address.state}, ${dummyUserData.account.address.zip}, ${dummyUserData.account.address.country}`,
            });
          }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === 'profileImage') {
        setProfileImage(files[0]);
      } else if (name === 'cv') {
        setCv(files[0]);
      }
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/account`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success('Profile updated successfully');
          setEditMode(false);
          const updatedData = await response.json();
          setUserData(updatedData.account);
          localStorage.setItem('userData', JSON.stringify(updatedData.account));
        } else {
          toast.error('Failed to update profile');
        }
      } catch (error) {
        toast.error('Something went wrong, Try again!');
      }
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newPassword = prompt('Enter your new password:');
    if (token && newPassword) {
      try {
        const response = await fetch(`${API_BASE_URL}/account/change-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: newPassword }),
        });

        if (response.ok) {
          toast.success('Password changed successfully');
        } else {
          toast.error('Failed to change password');
        }
      } catch (error) {
        toast.error('Something went wrong, Try again!');
      }
    }
  };

  const handleUploadProfileImage = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/account/upload-profile-image`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (response.ok) {
            toast.success('Profile image updated successfully');
            const updatedData = await response.json();
            setUserData(updatedData.account);
            localStorage.setItem('userData', JSON.stringify(updatedData.account));
          } else {
            toast.error('Failed to upload profile image');
          }
        } catch (error) {
          toast.error('Something went wrong, Try again!');
        }
      }
    }
  };

  const handleUploadCv = async () => {
    if (cv) {
      const formData = new FormData();
      formData.append('cv', cv);

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/account/upload-cv`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (response.ok) {
            toast.success('CV uploaded successfully');
            const updatedData = await response.json();
            setUserData(updatedData.account);
            localStorage.setItem('userData', JSON.stringify(updatedData.account));
          } else {
            toast.error('Failed to upload CV');
          }
        } catch (error) {
          toast.error('Something went wrong, Try again!');
        }
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-white mt-5 mb-7 p-6 rounded-lg mx-auto max-w-4xl'>
       <ToastContainer />
      <div className="container mt-7 mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        {userData ? (
          <div className="container mt-7 mx-auto p-4">
            <div className="flex flex-col items-center justify-center mb-4 border border-gray-100 pt-3 rounded pb-10">
              <img src={userData.profileImage || 'https://via.placeholder.com/150'} alt="Profile" className="w-32 h-32 rounded-full" />
              <input type="file" name="profileImage" onChange={handleFileChange} className="w-[30%] mt-2 mb-2" />
              <Button
                className="text-white px-4 py-2 rounded mt-2"
                text={'Change Profile Image'}
                onClick={handleUploadProfileImage}
              />
            </div>
            {editMode ? (
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
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                    />
                  </div>
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
                  <button type="button" onClick={() => setEditMode(false)} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-left justify-center pl-10 pt-10 pb-5 mb-4 border border-gray-100 pt-3 rounded pb-10">
                <p><span className='font-medium text-lg'>Name: </span>{userData.name}</p>
                <p><span className='font-medium text-lg'>Email: </span>{userData.email}</p>
                <p><span className='font-medium text-lg'>Phone: </span>{userData.phone}</p>
                <p><span className='font-medium text-lg'>Address: </span>{`${userData.address.street}, ${userData.address.city}, ${userData.address.state}, ${userData.address.zip}, ${userData.address.country}`}</p>
                <button onClick={() => setEditMode(true)} className="w-[30%] bg-blue-400 text-white px-4 py-2 rounded mt-4">Edit Profile</button>
                <button onClick={handleChangePassword} className="w-[30%] bg-red-400 text-white px-4 py-2 rounded mt-4">Change Password</button>
              </div>
            )}
            <div className="mt-8 flex flex-col items-left justify-center pl-10 pt-10 pb-5 mb-4 border border-gray-100 rounded">
              <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
              {userData.AppliedJobs.length > 0 ? (
                <ul>
                  {userData.AppliedJobs.map((job: any) => (
                    <li key={job.jobId} className="mb-4">
                      <p><span className='font-medium text-lg'>Position: </span>{job.position}</p>
                      <p><span className='font-medium text-lg'>Company: </span>{job.company}</p>
                      <p><span className='font-medium text-lg'>Applied At: </span>{new Date(job.appliedAt).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No jobs applied yet.</p>
              )}
            </div>
            <div className="mt-8 pl-10">
              <h2 className="text-xl font-bold mb-4">Upload CV</h2>
              <input type="file" name="cv" onChange={handleFileChange} className="mt-2" />
              <button onClick={handleUploadCv} className="bg-blue-400 text-white px-4 py-2 rounded mt-2">Upload CV</button>
            </div>
          </div>
        ) : (
          <div>No user data available</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;