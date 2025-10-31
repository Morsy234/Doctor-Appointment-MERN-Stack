import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import doctorRoutes from "./routes/doctor.js";
import appointmentRoutes from "./routes/appointment.js";
import departmentsRoutes from "./routes/departments.js";
const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000;


connectDB();

app.use(cors());
app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);
// Ensure and serve uploads from an absolute path relative to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));
app.use("/appointment", appointmentRoutes);
app.use("/departments", departmentsRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

