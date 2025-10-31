import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date:Date,
    reason:String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;