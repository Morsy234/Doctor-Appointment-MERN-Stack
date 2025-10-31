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
import { ToastContainer } from "react-toastify";

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
      </Routes>
    </>
  );
};

export default App;
