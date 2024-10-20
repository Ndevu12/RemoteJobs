import React from 'react';
import { toast } from 'react-toastify';
import Button from '../Buttons/Button';

interface ProfileImageUploadProps {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ profileImage, setProfileImage, userData, setUserData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setProfileImage(files[0]);
    }
  };

  const handleUploadProfileImage = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/account`, {
            method: 'PUT',
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
          console.log(error);
          toast.error('Something went wrong, Try again!');
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-4 border border-gray-100 pt-3 rounded pb-10">
      <img src={userData?.profileImage || 'https://via.placeholder.com/150'} alt="Profile" className="w-32 h-32 rounded-full" />
      <input type="file" name="profileImage" onChange={handleFileChange} className="w-[30%] mt-2 mb-2" />
      <Button
        className="text-white px-4 py-2 rounded mt-2"
        text={'Change Profile Image'}
        onClick={handleUploadProfileImage}
      />
    </div>
  );
};

export default ProfileImageUpload;