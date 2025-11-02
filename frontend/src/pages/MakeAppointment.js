import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MakeAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctor: "",
    date: "",
    reason: "",
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/doctors/allDoctors");
        setDoctors(res.data?.doctors || []);
      } catch (e) {
        // fallback, but keep UI usable
        toast.error("Failed to load doctors", { position: "top-center" });
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first", { position: "top-center" });
      navigate("/login");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/appointment/createAppointment",
        {
          doctor: formData.doctor,
          date: formData.date,
          reason: formData.reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Appointment created successfully", { position: "top-center" });
      setFormData({ doctor: "", date: "", reason: "" });
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to create appointment";
      toast.error(msg, { position: "top-center" });
    }
  };

  return (
    <div className="flex justify-center items-start pt-24 min-h-screen bg-blue-50 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          Book an Appointment
        </h2>
        <p className="text-blue-500 text-center mb-8">
          Fill in your details and we’ll connect you with a doctor on call.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-600 font-medium mb-1">Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a doctor
              </option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} — {d.speciality || d.specialty}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-blue-600 font-medium mb-1">Preferred Date</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-blue-600 font-medium mb-1">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., regular checkup, consultation"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeAppointment;
