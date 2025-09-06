import { register, login, getMe } from "../controllers/authController.js";
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";

const authRoutes = express.Router();

// Register
authRoutes.post("/register", register)

// Login
authRoutes.post("/login", login)


// Get current logged-in user (Library/Dashboard uses this)
authRoutes.get("/me", authMiddleware, getMe);


export default authRoutes;
