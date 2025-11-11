import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";

// 🧠 Signup Controller
export const signUp = async (req, res) => {
  try {
    console.log("📦 req.body =>", req.body);
    console.log("🖼️ req.file =>", req.file);

    const { firstName, lastName, email, userName, password } = req.body;

    // 🛑 Validate required fields
    if (!firstName || !lastName || !email || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🧠 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ☁️ Upload image if provided
    let imageUrl = null;
    if (req.file?.path) {
      try {
        imageUrl = await uploadOnCloudinary(req.file.path);
        console.log("✅ Image uploaded successfully:", imageUrl);
      } catch (err) {
        console.error("❌ Cloudinary upload failed:", err);
      }
    }

    // 👤 Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      userName,
      password: hashedPassword,
      profileImage: imageUrl,
    });

    await newUser.save();

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("🎉 New user created:", newUser.email);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profileImage: newUser.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("🔥 Signup Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🧠 Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found. Please sign up first." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("✅ User logged in:", user.email);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("🔥 Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🚪 Logout Controller
export const logout = async (req, res) => {
  try {
    // If using cookies for JWTs, you could clear them here like:
    // res.clearCookie("token");

    console.log("👋 User logged out");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("❌ Logout Error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};
