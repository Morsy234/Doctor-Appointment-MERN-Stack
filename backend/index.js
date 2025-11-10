// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";
// import connectDB from "./config/db.js";
// import userRoutes from "./routes/user.js";
// import doctorRoutes from "./routes/doctor.js";
// import appointmentRoutes from "./routes/appointment.js";
// import departmentsRoutes from "./routes/departments.js";
// const app = express();
// app.use(express.json());

// dotenv.config();
// const PORT = process.env.PORT || 3000;
// const connectPromise = connectDB();

// // Ensure the database connection is established before handling requests
// app.use(async (_req, _res, next) => {
//     await connectPromise;
//     next();
// });

// app.use(cors());
// app.use("/user", userRoutes);
// app.use("/doctors", doctorRoutes);
// // Ensure and serve uploads from an absolute path relative to this file
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const uploadsDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true });
// }
// app.use("/uploads", express.static(uploadsDir));
// app.use("/appointment", appointmentRoutes);
// app.use("/departments", departmentsRoutes);

// // Health route for uptime checks


// // Run the local server when not in Vercel/serverless

//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });

// export default app;


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import doctorRoutes from "./routes/doctor.js";
import appointmentRoutes from "./routes/appointment.js";
import departmentsRoutes from "./routes/departments.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to database once at startup
let connectPromise;
try {
  connectPromise = connectDB();
} catch (error) {
  console.error("Database connection error:", error);
}

// Middleware to ensure DB connection
app.use(async (_req, _res, next) => {
  try {
    await connectPromise;
    next();
  } catch (error) {
    console.error("Database middleware error:", error);
    next(error);
  }
});

// Routes
app.use("/user", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/departments", departmentsRoutes);

// Health check route
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use((err, _req, res, _next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Export for Vercel serverless
export default app;