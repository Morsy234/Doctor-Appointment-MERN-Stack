import express from "express";
import Appointment from "../models/AppointmentSchema.js";
import {auth} from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/createAppointment", auth, async (req, res) => {
    try{
        const { doctor, date, reason } = req.body;
        const userId = req.user?.id || req.user?._id;
        const normalizedUserId = mongoose.Types.ObjectId.isValid(userId)
            ? new mongoose.Types.ObjectId(userId)
            : null;
        if (!normalizedUserId) {
            return res.status(401).json({ message: "Unauthorized: invalid user id in token" });
        }
        if(!doctor || !date || !reason) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const appointment = await Appointment.create({ user: normalizedUserId, doctor, date, reason });
        res.status(201).json({ message: "Appointment created successfully", appointment:appointment});
        
    }catch(error){
        res.status(500).json({ message: "Internal server error", error:error});
    }
});

router.get("/getAppointments", auth, async (req, res) => {
    try{
        const userId = req.user?.id || req.user?._id;
        console.log("getAppointments userId:", userId);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: missing user id in token" });
        }
        const normalizedUserId = mongoose.Types.ObjectId.isValid(userId)
            ? new mongoose.Types.ObjectId(userId)
            : null;
        if (!normalizedUserId) {
            return res.status(401).json({ message: "Unauthorized: invalid user id in token" });
        }
        let appointments;
        try {
            appointments = await Appointment.find({ user: normalizedUserId })
                .populate("doctor", "name speciality specialty image")
                .sort({ date: -1 });
        } catch (populateError) {
            console.error("Populate error in getAppointments:", populateError);
            // Fallback in case old records have non-ObjectId doctor values
            appointments = await Appointment.find({ user: normalizedUserId }).sort({ date: -1 });
        }
        res.status(200).json({ message: "Appointments fetched successfully", userId: String(normalizedUserId), appointments });
    }catch(error){
        console.error("getAppointments error:", error);
        res.status(500).json({ message: "Internal server error", error: { message: error?.message, stack: error?.stack } });
    }
});

router.post("/cancelAppointment", auth, async (req, res) => {
    try{
        const { appointmentId } = req.body;
        const userId = req.user?.id || req.user?._id;
        const normalizedUserId = mongoose.Types.ObjectId.isValid(userId)
            ? new mongoose.Types.ObjectId(userId)
            : null;
        if (!normalizedUserId) {
            return res.status(401).json({ message: "Unauthorized: invalid user id in token" });
        }
        const appointment = await Appointment.findOneAndDelete({ _id: appointmentId, user: normalizedUserId });
        if(!appointment) {
            return res.status(400).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment cancelled successfully", appointment:appointment});
    }catch(error){
        res.status(500).json({ message: "Internal server error", error:error});
    }
});

export default router;