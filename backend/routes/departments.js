import express from "express";
import Department from "../models/Departments.js";
import {auth} from "../middleware/auth.js";
import multer from "multer"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Ensure uploads directory exists (absolute path relative to backend directory)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.join(__dirname, "..");
const uploadsDir = path.join(backendRoot, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })

// Public: list all departments
router.get("/", async (req, res) => {
    try{
        const departments = await Department.find({}).sort({ name: 1 });
        res.json({ departments });
    }catch(error){
        res.status(500).json({ message: "Internal server error", error:error});
    }
});

router.post("/addDepartment", upload.single('image'), auth, async (req, res) => {
    try{
        if(!req.user.role === "admin") {
            return res.status(401).json({ message: "Access denied, you are not authorized to add a department" });
        }
        const { name, description } = req.body;
        const image = req.file?req.file.filename:null;
        if(!name || !description || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const department = await Department.create({ name, description, image:req.file.filename });
        res.status(201).json({ message: "Department created successfully", department:department});
    }catch(error){
        res.status(500).json({ message: "Internal server error", error:error});
    }
});

export default router;