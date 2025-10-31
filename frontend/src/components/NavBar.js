// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, Home, Info, Briefcase, Mail } from 'lucide-react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation(); // to get current path
  
//   const navItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/about', label: 'About', icon: Info },
//     { path: '/services', label: 'Services', icon: Briefcase },
//     { path: '/contact', label: 'Contact', icon: Mail },
//   ];

//   const handleLinkClick = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
          
//           {/* Logo */}
//           <div className="flex items-center -ml-20">
//             <Link
//               to="/"
//               onClick={handleLinkClick}
//               className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
//             >
//               MediConnect
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 onClick={handleLinkClick}
//                 className={`flex items-center space-x-1 transition ${
//                   location.pathname === path
//                     ? 'text-blue-600 font-semibold'
//                     : 'text-gray-600 hover:text-blue-600'
//                 }`}
//               >
//                 <Icon size={18} />
//                 <span>{label}</span>
//               </Link>
//             ))}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-blue-600 transition"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 onClick={handleLinkClick}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
//                   location.pathname === path
//                     ? 'bg-blue-50 text-blue-600'
//                     : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <Icon size={18} />
//                 <span>{label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   Info,
//   Briefcase,
//   Mail,
//   User,
//   LogOut,
//   CalendarDays,
// } from "lucide-react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dropdownRef = useRef();

//   const navItems = [
//     { path: "/", label: "Home", icon: Home },
//     { path: "/about", label: "About", icon: Info },
//     { path: "/services", label: "Services", icon: Briefcase },
//     { path: "/contact", label: "Contact", icon: Mail },
//   ];

//   // Detect logged-in user
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsDropdownOpen(false);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* Logo */}
//           <Link
//             to="/"
//             onClick={() => setIsMenuOpen(false)}
//             className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
//           >
//             MediConnect
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`flex items-center space-x-1 transition ${
//                   location.pathname === path
//                     ? "text-blue-600 font-semibold"
//                     : "text-gray-600 hover:text-blue-600"
//                 }`}
//               >
//                 <Icon size={18} />
//                 <span>{label}</span>
//               </Link>
//             ))}

//             {/* User Dropdown */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
//               >
//                 <User size={24} />
//                 {user && <span className="hidden sm:inline">{user.name}</span>}
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50">
//                   {user ? (
//                     <>
//                       <Link
//                         to="/profile"
//                         className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
//                         onClick={() => setIsDropdownOpen(false)}
//                       >
//                         <User size={18} className="mr-2" /> Profile
//                       </Link>
//                       <Link
//                         to="/appointments"
//                         className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
//                         onClick={() => setIsDropdownOpen(false)}
//                       >
//                         <CalendarDays size={18} className="mr-2" /> Book Appointment
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
//                       >
//                         <LogOut size={18} className="mr-2" /> Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link
//                         to="/login"
//                         className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
//                         onClick={() => setIsDropdownOpen(false)}
//                       >
//                         Login
//                       </Link>
//                       <Link
//                         to="/register"
//                         className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
//                         onClick={() => setIsDropdownOpen(false)}
//                       >
//                         Signup
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-600 hover:text-blue-600 transition"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-gray-200">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {navItems.map(({ path, label, icon: Icon }) => (
//               <Link
//                 key={path}
//                 to={path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
//                   location.pathname === path
//                     ? "bg-blue-50 text-blue-600"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <Icon size={18} />
//                 <span>{label}</span>
//               </Link>
//             ))}

//             {/* Mobile Login/Logout */}
//             <div className="border-t border-gray-200 mt-2 pt-2">
//               {user ? (
//                 <>
//                   <Link
//                     to="/profile"
//                     className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                   <Link
//                     to="/appointments"
//                     className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Book Appointment
//                   </Link>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Signup
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;









import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  Mail,
  User,
  LogOut,
  CalendarDays,
  PlusCircle,
  Layers,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.js"; // ✅ Import context

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ Get user & logout directly from context
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: Info },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            MediConnect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 transition ${
                  location.pathname === path
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition"
              >
                <User size={24} />
                {user && <span className="hidden sm:inline">{user.name}</span>}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                  {user ? (
                    <>
                      {user.role === "admin" ? (
                        <>
                          <Link
                            to="/add-doctor"
                            className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <PlusCircle size={18} className="mr-2" /> Add Doctor
                          </Link>
                          <Link
                            to="/add-department"
                            className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <Layers size={18} className="mr-2" /> Add Department
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/add-appointment"
                            className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <CalendarDays size={18} className="mr-2" /> Book Appointment
                          </Link>
                          <Link
                            to="/my-appointments"
                            className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <CalendarDays size={18} className="mr-2" /> My Appointments
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={18} className="mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
                  location.pathname === path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}

            <div className="border-t border-gray-200 mt-2 pt-2">
              {user ? (
                <>
                  {user.role === "admin" ? (
                    <>
                      <Link
                        to="/add-doctor"
                        className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Add Doctor
                      </Link>
                      <Link
                        to="/add-department"
                        className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Add Department
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/add-appointment"
                        className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Book Appointment
                      </Link>
                      <Link
                        to="/my-appointments"
                        className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Appointments
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
