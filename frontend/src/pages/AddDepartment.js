import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleAddDepartment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add a department", {
          position: "top-center",
        });
        return;
      }


     const res= await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/departments/addDepartment`, {name,description,image}, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data)

      toast.success("Department Added Successfully!", {
        position: "top-center",
        autoClose: 2000,
      });

      //navigate("/departments");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add department",
        {
          position: "top-center",
          autoClose: 2500,
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="bg-white w-full max-w-xl p-8 mt-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Add a Department
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please add the department details below
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Department Name"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />

          <textarea
            placeholder="Description"
            rows="3"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange}
          />

          
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full mx-auto mt-2"
            />
          )}

          <button
            onClick={handleAddDepartment}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
          >
            Add Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
