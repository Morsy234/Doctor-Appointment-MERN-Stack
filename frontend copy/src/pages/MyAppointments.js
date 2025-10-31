import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    reason: "",
  });
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view appointments", { position: "top-center" });
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:5000/appointment/getAppointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("My appointments response:", res.data);
        setAppointment(res.data?.appointments || []);
      } catch (e) {
        const status = e?.response?.status;
        if (status === 401) {
          toast.error("Session expired. Please log in again.", { position: "top-center" });
          navigate("/login");
          return;
        }
        toast.error("Failed to load appointments", { position: "top-center" });
      }
    };
    fetchAppointments();
  }, []);

  


  return (
    <div className="flex justify-center items-start pt-24 min-h-screen bg-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          My Appointments
        </h1>
        <p className="text-center text-gray-500 mb-4">Total: {appointment.length}</p>
        {appointment.length === 0 ? (
          <p className="text-center text-gray-600">No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointment.map((a) => (
              <div key={a._id} className="border border-blue-100 rounded-lg p-4">
                <p className="text-blue-700 font-semibold">Doctor: {a.doctor?.name || a.doctor}</p>
                <p className="text-gray-700">Date: {new Date(a.date).toLocaleString()}</p>
                <p className="text-gray-600">Reason: {a.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
