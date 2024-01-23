import React, { useState } from 'react';
import { fileDb } from '../firebase/firebase_config';
import { ref, uploadBytes } from 'firebase/storage';
import { PulseLoader } from 'react-spinners'
import { GiDeliveryDrone } from "react-icons/gi";
import { FaFileUpload } from "react-icons/fa";

const UploadFile = () => {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (filesToUpload.length === 0) {
      alert("no file selected!")
      return;
    };

    try {
      setLoading(true);
      // Iterate through each selected file and upload it
      for (const file of filesToUpload) {
        const fileRef = ref(fileDb, file.name);
        await uploadBytes(fileRef, file);
      };
      alert("File uploaded successfully!")
      // Clear the array after successful upload
      setFilesToUpload([]);
    } catch (error) {
      alert('Error uploading files:', error)
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFilesToUpload((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
  };

  return (
    <div className="pt-32 flex items-center justify-center text-white">
      {!loading ? <div className="w-full max-w-sm p-6 bg-slate-800 border rounded-xl m-2 space-y-3">
        <p className="text-center text-3xl font-bold mb-2">Upload</p>
        <label className="block text-white text-xl font-bold mb-2">
          Choose files:
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          className="bg-white rounded p-2 mb-4 w-[100%] hidden"
          multiple
          id='files'

        />
        <div className='border bg-slate-800  p-2 hover:bg-slate-900 rounded cursor-pointer'>
          <label htmlFor='files' className='cursor-pointer font-bold flex justify-center items-center gap-3'>Select files
          <span htmlFor='files'><FaFileUpload /></span></label>
        </div>
        <button
          onClick={upload}
          className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Upload Files
        </button>
      </div> :
        <div className='flex justify-center gap-2 items-center pt-10'>
          <GiDeliveryDrone className='text-5xl text-white animate-bounce' />
          <p className='text-white text-3xl'>Loading <span><PulseLoader
            color="#ffffff"
            size={7}
            speedMultiplier={0.7}
          /></span> </p>
        </div>
      }
    </div>
  );
};

export default UploadFile;
