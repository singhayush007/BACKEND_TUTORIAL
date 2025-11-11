import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();

// ✅ Correct CORS setup
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 correct spelling
    credentials: true, // allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // optional but clean
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/", authRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  connectDB();
  console.log(`🚀 Server is running on port ${port}`);
});
