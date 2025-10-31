import React, { useEffect, useState } from "react";
import axios from "axios";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    axios
      .get("http://localhost:5000/departments")
      .then((res) => {
        if (!isMounted) return;
        setDepartments(res.data?.departments || []);
        setError("");
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Failed to load departments");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-12 text-black">Departments</h2>

      {loading && (
        <p className="text-center text-gray-600">Loading departments...</p>
      )}

      {error && !loading && (
        <p className="text-center text-red-600">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => {
            const imgSrc = d.image
              ? `http://localhost:5000/uploads/${d.image}`
              : undefined;
            return (
              <div key={d._id || d.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                {imgSrc ? (
                  <img src={imgSrc} alt={d.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{d.name}</h3>
                  <p className="text-gray-600">{d.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Departments;


