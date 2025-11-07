import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.routes.js";

dotenv.config(); // ✅ Load environment variables
const PORT = process.env.PORT || 3000; // ✅ Define PORT

const app = express();

app.use(express.json());
app.use("/api", userRouter);

// ✅ Connect MongoDB before starting server
connectDb();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
