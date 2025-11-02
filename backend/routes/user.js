import express from "express";
import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password,role } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword ,role});
    let token = jwt.sign({ email,id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ message: "User created successfully", token ,user:user});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if(!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid password" });
    }
    let token = jwt.sign({ email,id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token ,user:user});
});


export default router;