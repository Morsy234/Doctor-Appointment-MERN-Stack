import express from "express";
import Doctor from "../models/DoctorSchema.js";
import multer from "multer";
import {auth, requireRole} from "../middleware/auth.js";


const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })




  

router.post("/add", upload.single('image'), auth,requireRole,async (req, res) => {

    try{ const { name, speciality, experienceYears, description } = req.body;
    const image = req.file?req.file.filename:null;
    if(!name || !speciality || !experienceYears  || !image || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingDoctor = await Doctor.findOne({ name });
    if(existingDoctor) {
        return res.status(400).json({ message: "Doctor already exists" });
    }
    const doctor = await Doctor.create({ name, speciality, experienceYears, image:req.file.filename, description });
    res.status(201).json({ message: "Doctor created successfully", doctor:doctor});
}catch(error){
        res.status(500).json({ message: "Internal server error", error:error});
    }
   
});

router.get("/alldoctors", async (req, res) => {
    try{
        const doctors = await Doctor.find();
        if(!doctors) {
            return res.status(400).json({ message: "No doctors found" });
        }
        res.status(200).json({ message: "Doctors fetched successfully", doctors:doctors});
    }catch(error){
        res.status(500).json({ message: "Internal server error", error:error});
    }
});

router.get("/:id", async (req, res) => {
    try{
        const doctor = await Doctor.findById(req.params.id);
        if(!doctor) {
            return res.status(400).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor fetched successfully", doctor:doctor});
    }catch(error){
        res.status(500).json({ message: "Internal server error", error:error});
    }
});

export default router;