import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect } from "react";

const DoctorDetail = () => {
  const { id } = useParams(); // Assuming the route is /doctor/:id
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to view doctor details", {
            position: "top-center",
          });
          navigate("/login");
          return;
        }
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("API Response:", res.data); // For debugging
        setDoctor(res.data.doctor); 
      } catch (error) {
        console.error("Error fetching doctor:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to load doctor details";
        toast.error(errorMessage, {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id, navigate]);

  // Timeout to force clear image loading after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setImageLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="text-blue-700 text-xl">Loading...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
        <div className="text-red-700 text-xl">Doctor not found</div>
      </div>
    );
  }

  return (
    //<div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="min-h-screen w-full bg-white p-8 mt-20 flex items-center justify-center">
        {/* Image on the left */}
        <div className="flex-1 relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-l-2xl">
              <div className="text-gray-500">Loading image...</div>
            </div>
          )}
          <img
            src={`${process.env.REACT_APP_BACKEND_BASE_URL}/uploads/${doctor.image}`}
            alt={doctor.name}
            className={`w-full h-full object-cover rounded-l-2xl ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x400?text=No+Image";
              setImageLoading(false);
            }}
          />
        </div>
        {/* Details on the right */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Doctor Details
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50">
              <strong>Name:</strong> {doctor.name}
            </div>

            <div className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50">
              <strong>Speciality:</strong> {doctor.speciality}
            </div>

            <div className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50">
              <strong>Experience Years:</strong> {doctor.experienceYears}
            </div>

            <div className="border border-gray-300 p-3 w-full rounded-lg bg-gray-50">
              <strong>Description:</strong> {doctor.description}
            </div>

            {/* <button
              onClick={() => navigate("/")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
            >
              Back to Home
            </button> */}
          </div>
        </div>
      </div>
    //</div>
  );
};

export default DoctorDetail;
