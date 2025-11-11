import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config(); // ensures env variables load from .env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload function
const uploadOnCloudinary = async (filePath) => {
  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "user_profiles", // optional folder name
    });

    console.log("✅ Image uploaded successfully:", result.secure_url);

    // ✅ Delete local file after upload
    fs.unlinkSync(filePath);

    return result.secure_url; // return the image URL
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error);

    // 🧹 Clean up file if exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

export default uploadOnCloudinary;

