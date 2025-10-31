import React from "react";
import aboutImg from "../assets/about.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">About MediConnect</h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          MediConnect makes it simple to discover doctors, book appointments, and manage your healthcare online.
        </p>

        <div className="mb-10">
          <img
            src={aboutImg}
            alt="About MediConnect"
            className="max-w-full h-auto rounded-xl shadow-md mx-auto"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-8 rounded-2xl shadow-md bg-white min-h-44">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Our Mission</h3>
            <p className="text-gray-600 text-lg">Deliver accessible, reliable, and efficient healthcare booking for everyone.</p>
          </div>
          <div className="p-8 rounded-2xl shadow-md bg-white min-h-44">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Our Network</h3>
            <p className="text-gray-600 text-lg">Partnered with certified doctors across multiple specialties.</p>
          </div>
          <div className="p-8 rounded-2xl shadow-md bg-white min-h-44">
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">Our Promise</h3>
            <p className="text-gray-600 text-lg">Your health data is handled securely with privacy in mind.</p>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-xl bg-blue-50 text-blue-800">
          <h3 className="text-xl font-semibold mb-2">How It Works</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Browse doctors by specialty.</li>
            <li>Pick a suitable date and time.</li>
            <li>Confirm your appointment — you’re all set.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default About;


