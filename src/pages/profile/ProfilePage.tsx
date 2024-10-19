import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useNavigate } from 'react-router-dom';
import { dummyUserData } from '../../../DummyData/users/dummyUserData';
// import Button from '../../components/Buttons/Button';
import { jwtDecode } from 'jwt-decode';
import ProfileImageUpload from '../../components/Froms/ProfileImageUpload';
import AddressForm from '../../components/Froms/AddressForm';
import CvUpload from '../../components/Froms/CvUpload';
import EducationForm from '../../components/Froms/EducationForm';
import ExperienceForm from '../../components/Froms/ExperienceForm';
import SkillsForm from '../../components/Froms/SkillsForm';
const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const defaultJobKey = () => {
  return `${Math.random().toString(36).substr(2, 9)}`;
};

const ProfilePage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: { street: '', city: '', state: '', zipCode: '', country: '' } });
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
          // Decode the token to get the userId
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await fetch(`${API_BASE_URL}/account/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data.account);
            setFormData({
              name: data.account.name || '',
              email: data.account.email || '',
              phone: data.account.phone || '',
              address: {
                street: data.account.address?.street || '',
                city: data.account.address?.city || '',
                state: data.account.address?.state || '',
                zipCode: data.account.address?.zipCode || '',
                country: data.account.address?.country || ''
              },
            });
            localStorage.setItem('userData', JSON.stringify(data.account));
          } else {
            toast.error('Failed to fetch user data');
            const localData = localStorage.getItem('userData');
            if (localData) {
              const parsedData = JSON.parse(localData);
              setUserData(parsedData);
              setFormData({
                name: parsedData?.name || '',
                email: parsedData?.email || '',
                phone: parsedData?.phone || '',
                address: {
                  street: parsedData?.address?.street || '',
                  city: parsedData?.address?.city || '',
                  state: parsedData?.address?.state || '',
                  zipCode: parsedData?.address?.zipCode || '',
                  country: parsedData?.address?.country || ''
                },
              });
            } else {
              setUserData(dummyUserData.account); // Use dummy data
              setFormData({
                name: dummyUserData.account?.name || '',
                email: dummyUserData.account?.email || '',
                phone: dummyUserData.account?.phone || '',
                address: {
                  street: dummyUserData.account?.address?.street || '',
                  city: dummyUserData.account?.address?.city || '',
                  state: dummyUserData.account?.address?.state || '',
                  zipCode: dummyUserData.account?.address?.zip || '',
                  country: dummyUserData.account?.address?.country || ''
                },
              });
            }
          }
        } catch (error: any) {
          toast.error(error.message);
          const localData = localStorage.getItem('userData');
          if (localData) {
            const parsedData = JSON.parse(localData);
            setUserData(parsedData);
            setFormData({
              name: parsedData?.name || '',
              email: parsedData?.email || '',
              phone: parsedData?.phone || '',
              address: {
                street: parsedData?.address?.street || '',
                city: parsedData?.address?.city || '',
                state: parsedData?.address?.state || '',
                zipCode: parsedData?.address?.zipCode || '',
                country: parsedData?.address?.country || ''
              },
            });
          } else {
            setUserData(dummyUserData.account); // Use dummy data
            setFormData({
              name: dummyUserData.account?.name || '',
              email: dummyUserData.account?.email || '',
              phone: dummyUserData.account?.phone || '',
              address: {
                street: dummyUserData.account?.address?.street || '',
                city: dummyUserData.account?.address?.city || '',
                state: dummyUserData.account?.address?.state || '',
                zipCode: dummyUserData.account?.address?.zip || '',
                country: dummyUserData.account?.address?.country || ''
              },
            });
          }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [isLoggedIn, navigate]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (['street', 'city', 'state', 'zipCode', 'country'].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        console.log({ formData });
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
        } else if (response.status === 400) {
          const errorData = await response.json();
          const errorMessage = errorData.message || 'Failed to update profile';
          toast.error(errorMessage);
        }
      } catch (error) {
        console.log(error);
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
        console.log(error);
        toast.error('Something went wrong, Try again!');
      }
    }
  };

  const handleEducationInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    const updatedEducation = [...userData.education];
    updatedEducation[index] = { ...updatedEducation[index], [name]: value };
    setUserData({ ...userData, education: updatedEducation });
  };

  const handleAddEducation = () => {
    const updatedEducation = [...userData.education, { institution: '', degree: '', year: '' }];
    setUserData({ ...userData, education: updatedEducation });
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = userData.education.filter((_: any, i: number) => i !== index);
    setUserData({ ...userData, education: updatedEducation });
  };

  const handleUpdateEducation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/account/education`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ education: userData.education }),
        });

        if (response.ok) {
          toast.success('Education updated successfully');
          const updatedData = await response.json();
          setUserData(updatedData.account);
          localStorage.setItem('userData', JSON.stringify(updatedData.account));
        } else {
          toast.error('Failed to update education');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong, Try again!');
      }
    }
  };

  const handleExperienceInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    const updatedExperience = [...userData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [name]: value };
    setUserData({ ...userData, experience: updatedExperience });
  };

  const handleAddExperience = () => {
    const updatedExperience = [...userData.experience, { company: '', role: '', duration: '' }];
    setUserData({ ...userData, experience: updatedExperience });
  };

  const handleRemoveExperience = (index: number) => {
    const updatedExperience = userData.experience.filter((_: any, i: number) => i !== index);
    setUserData({ ...userData, experience: updatedExperience });
  };

  const handleUpdateExperience = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/account/experience`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ experience: userData.experience }),
        });

        if (response.ok) {
          toast.success('Experience updated successfully');
          const updatedData = await response.json();
          setUserData(updatedData.account);
          localStorage.setItem('userData', JSON.stringify(updatedData.account));
        } else {
          toast.error('Failed to update experience');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong, Try again!');
      }
    }
  };

  const handleSkillsInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    const updatedSkills = [...userData.skills];
    updatedSkills[index] = { ...updatedSkills[index], [name]: value };
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleAddSkill = () => {
    const updatedSkills = [...userData.skills, { name: '' }];
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = userData.skills.filter((_: any, i: number) => i !== index);
    setUserData({ ...userData, skills: updatedSkills });
  };

  const handleUpdateSkills = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE_URL}/account/skills`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ skills: userData.skills }),
        });

        if (response.ok) {
          toast.success('Skills updated successfully');
          const updatedData = await response.json();
          setUserData(updatedData.account);
          localStorage.setItem('userData', JSON.stringify(updatedData.account));
        } else {
          toast.error('Failed to update skills');
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong, Try again!');
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
            <ProfileImageUpload
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              userData={userData}
              setUserData={setUserData}
            />
            {editMode ? (
              <div className="flex flex-col items-center justify-center mb-4 border border-gray-100 pt-3 rounded pb-10">
                <AddressForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleUpdateProfile={handleUpdateProfile}
                  setEditMode={setEditMode}
                />
              </div>
            ) : (
              <div className="flex flex-col items-left justify-center pl-10 pt-10 pb-5 mb-4 border border-gray-100 pt-3 rounded pb-10">
                <p><span className='font-medium text-lg'>Name: </span>{userData?.name}</p>
                <p><span className='font-medium text-lg'>Email: </span>{userData?.email}</p>
                <p><span className='font-medium text-lg'>Occupation: </span>{userData?.occupation}</p>
                <p><span className='font-medium text-lg'>Phone: </span>{userData?.phone}</p>
                <p><span className='font-medium text-lg'>Address: </span>{`${userData?.address?.street || ''}, ${userData?.address?.city || ''}, ${userData?.address?.state || ''}, ${userData?.address?.zipCode || ''}, ${userData?.address?.country || ''}`}</p>
                <button onClick={() => setEditMode(true)} className="w-[30%] bg-blue-400 text-white px-4 py-2 rounded mt-4">Edit Profile</button>
                <button onClick={handleChangePassword} className="w-[30%] bg-red-400 text-white px-4 py-2 rounded mt-4">Change Password</button>
              </div>
            )}
            <div className="mt-8 flex flex-col items-left justify-center pl-10 pt-10 pb-5 mb-4 border border-gray-100 rounded">
              <h2 className="text-xl font-bold mb-4">Applied Jobs</h2>
              {userData?.appliedJobs?.length > 0 ? (
                <ul>
                  {userData.appliedJobs.map((job: any) => (
                    <li key={defaultJobKey()} className="mb-4">
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
            <CvUpload
              cv={cv}
              setCv={setCv}
              userData={userData}
              setUserData={setUserData}
            />
            <div className="mt-8 pl-10">
              <h2 className="text-xl font-bold mb-4">Education</h2>
              <EducationForm
                education={userData.education}
                handleInputChange={handleEducationInputChange}
                handleAddEducation={handleAddEducation}
                handleRemoveEducation={handleRemoveEducation}
                handleUpdateEducation={handleUpdateEducation}
              />
            </div>
            <div className="mt-8 pl-10">
              <h2 className="text-xl font-bold mb-4">Experience</h2>
              <ExperienceForm
                experience={userData.experience}
                handleInputChange={handleExperienceInputChange}
                handleAddExperience={handleAddExperience}
                handleRemoveExperience={handleRemoveExperience}
                handleUpdateExperience={handleUpdateExperience}
              />
            </div>
            <div className="mt-8 pl-10">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <SkillsForm
                skills={userData.skills}
                handleInputChange={handleSkillsInputChange}
                handleAddSkill={handleAddSkill}
                handleRemoveSkill={handleRemoveSkill}
                handleUpdateSkills={handleUpdateSkills}
              />
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