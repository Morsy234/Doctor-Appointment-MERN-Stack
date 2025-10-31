// import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchedDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5000/doctor/alldoctors");
        const data = await res.json();
        console.log("Fetched doctors:", data);
        if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");
        setDoctors(data.doctors.slice(0, 10)); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchedDoctors();
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">
          Our Doctors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {doctors?.map((doc) => (
            <div
              key={doc?._id}
              className="bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center"
            >
              <Link to={`/doctor/${doc?._id}`} className="w-full">
                <img
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-100 mb-4"
                  src={`http://localhost:5000/uploads/${doc?.image}`}
                  alt={doc?.name}
                />
                <h3 className="text-xl font-bold mb-1 text-blue-700">
                  {doc?.name}
                </h3>
                <p className="text-gray-700 mb-1">{doc?.specialty}</p>
                <p className="text-sm text-gray-500">
                  {doc?.experienceYears} Years of Experience
                </p>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/allDoctors"
            className=" inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            See All Doctors 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Doctors;
