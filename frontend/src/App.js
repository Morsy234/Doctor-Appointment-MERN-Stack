import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MakeAppointment from "./pages/MakeAppointment";
import MyAppointments from "./pages/MyAppointments";
import AddDoctor from "./pages/AddDoctor";
import DoctorDetail from "./pages/DoctorDetail";
import { ToastContainer } from "react-toastify";
import AddDepartment from "./pages/AddDepartment";
import AllDepartments from "./pages/AllDepartments"

const App = () => {
  return (
    <>
          <ToastContainer />

      {/* Navbar stays fixed on all pages */}
      <NavBar />

      {/* Define routes for each page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/allDoctors" element={<Doctors />} />
        <Route path="/add-appointment" element={<MakeAppointment />} /> 
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/add-department" element={<AddDepartment/>} />
        <Route path="/allDepartments" element={<AllDepartments />} />

        
      </Routes>
    </>
  );
};

export default App;
