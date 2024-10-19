import React from 'react';
import { toast } from 'react-toastify';

interface CvUploadProps {
  cv: File | null;
  setCv: React.Dispatch<React.SetStateAction<File | null>>;
  userData: any;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const API_BASE_URL = (import.meta as any).env.VITE_REACT_APP_API_BASE_URL;

const CvUpload: React.FC<CvUploadProps> = ({ cv, setCv, userData, setUserData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setCv(files[0]);
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
            method: 'PUT',
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
          console.log(error);
          toast.error('Something went wrong, Try again!');
        }
      }
    }
  };

  return (
    <div className="mt-8 pl-10">
      <h2 className="text-xl font-bold mb-4">Upload CV</h2>
      <input type="file" name="cv" onChange={handleFileChange} className="mt-2" />
      <button onClick={handleUploadCv} className="bg-blue-400 text-white px-4 py-2 rounded mt-2">Upload CV</button>
    </div>
  );
};

export default CvUpload;