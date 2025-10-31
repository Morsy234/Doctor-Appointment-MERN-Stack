import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:String,
    speciality:String,
    experienceYears:Number,
    image:String,
    description:String
   
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;