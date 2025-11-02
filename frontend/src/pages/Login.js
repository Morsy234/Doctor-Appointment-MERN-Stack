import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.js";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate(); 
  const { login } = useAuth();


  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });

      login(res.data.token, res.data.user);
      // localStorage is handled inside context; keep below only if needed elsewhere
      //localStorage.setItem("token", res.data.token);
      //localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/"); 

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        
      });
    } catch (error) {
      toast.error("Invalid email or password!", {
        position: "top-center",
        autoClose: 2000,
        
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Please log in to book your appointment
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>

    </div>
  );
};

export default Login;
