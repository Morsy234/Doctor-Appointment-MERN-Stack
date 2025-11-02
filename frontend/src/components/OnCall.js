import React from "react";
import { useNavigate } from "react-router-dom";

const OnCall = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-blue-600 text-white py-16 px-6 md:px-12 text-center flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Need Help or Medical Assistance?
      </h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl">
        Our medical team is here to support you 24/7. Whether you have a health concern
        or want to schedule an appointment — we’re just one click away.
      </p>
      <button
        onClick={() => navigate("/add-appointment")}
        className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-all"
      >
        Book an Appointment
      </button>
    </section>
  );
};

export default OnCall;
