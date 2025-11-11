import express from "express";
import { signUp, login, logout } from "../controllers/auth.controllers.js";
import upload from "../middleware/multer.js";

const authRouter = express.Router();
//authRouter basically Express Router ka ek instance hota hai jo authentication related routes (jaise signup, login, logout) ko handle karta hai.
// 📝 Signup Route
authRouter.post("/signup", upload.single("image"), signUp);

// 🔑 Login Route
authRouter.post("/login", login);

// 🚪 Logout Route
authRouter.post("/logout", logout);

export default authRouter;
