// // import { ArrowRight } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function Doctors() {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchedDoctors = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/doctors/alldoctors");
//         const data = await res.json();
//         console.log("Fetched doctors:", data);
//         if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");
//         setDoctors(data.doctors); 
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchedDoctors();
//   }, []);

//   return (
//     <div className="bg-white py-16 mt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold text-center mb-12 text-black">
//           Our Doctors
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {doctors?.map((doc) => (
//             <div
//               key={doc?._id}
//               className="bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center"
//             >
//               <Link to={`/doctors/${doc?._id}`} className="w-full">
//                 <img
//                   className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-100 mb-4"
//                   src={`http://localhost:5000/uploads/${doc?.image}`}
//                   alt={doc?.name}
//                 />
//                 <h3 className="text-xl font-bold mb-1 text-blue-700">
//                   {doc?.name}
//                 </h3>
//                 <p className="text-gray-700 mb-1">{doc?.specialty}</p>
//                 <p className="text-sm text-gray-500">
//                   {doc?.experienceYears} Years of Experience
//                 </p>
//               </Link>
//             </div>
//           ))}
//         </div>

      
//       </div>
//     </div>
//   );
// }

// export default Doctors;




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchedDoctors = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/doctors/alldoctors`);
        const data = await res.json();
        console.log("Fetched doctors:", data);
        if (!res.ok) throw new Error(data.message || "Failed to fetch doctors");
        setDoctors(data.doctors); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchedDoctors();
  }, []);

  // Filter doctors based on search query
  const filteredDoctors = doctors.filter((doc) => {
    const query = searchQuery.toLowerCase();
    return (
      doc?.name?.toLowerCase().includes(query) ||
      doc?.specialty?.toLowerCase().includes(query)
    );
  });

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 mt-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">
          Our Doctors
        </h2>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredDoctors?.map((doc) => (
            <div
              key={doc?._id}
              className="bg-blue-50 rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center"
            >
              <Link to={`/doctors/${doc?._id}`} className="w-full">
                <img
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-100 mb-4"
                  src={`${process.env.REACT_APP_BACKEND_BASE_URL}/uploads/${doc?.image}`}
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

        {/* No Results Message */}
        {filteredDoctors.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No doctors found matching "<span className="font-semibold">{searchQuery}</span>"
            </p>
            <button
              onClick={clearSearch}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}

        
      </div>
    </div>
  );
}

export default Doctors;