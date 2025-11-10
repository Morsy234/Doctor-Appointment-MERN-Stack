import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  //const { login } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // for UI preview only
    }
  };

  const handleAddDoctoctor = async () => {
    try {


      const token = localStorage.getItem("token"); 
      if (!token) {
        toast.error("You must be logged in to add a doctor", {
          position: "top-center",
        });
        return;
      }
     // const res = 
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/doctors/add`, {
        name,
        speciality,
        experienceYears,
        description,
        image,
      },{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ attach token
        },});

      navigate("/");

      toast.success("Doctor Added Successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      //Check if backend sent "Access denied" message
      
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 2500,
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="bg-white w-full max-w-xl p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Add a Doctor
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please add the doctors details
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Speciality"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSpeciality(e.target.value)}
          />

          <input
            type="number"
            placeholder="Experience Years"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setExperienceYears(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            //placeholder="image"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange}
          />

          {/* Image preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full mx-auto mt-2"
            />
          )}

          <input
            type="text"
            placeholder="Description"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleAddDoctoctor}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
