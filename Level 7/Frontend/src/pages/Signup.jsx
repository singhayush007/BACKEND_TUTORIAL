import React, { useState, useContext } from "react";
import { FaImage } from "react-icons/fa";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signupUserAPI, loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // 🧠 Image Change Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // actual file save
      setPreview(URL.createObjectURL(file)); // preview show
    }
  };

  // 🧠 Input Change Handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🧠 Submit Handler (FormData ke through API call)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // formData + image ko ek hi request me bhejne ke liye FormData use karo
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("userName", formData.userName);
      data.append("password", formData.password);
      data.append("image", image); // field name same as backend upload.single("image")

      const res = await signupUserAPI(data); // UserContext me API call hai

      if (res?.user) {
        loginUser(res.user);
        alert("🎉 Signup successful!");
        navigate("/login");
      } else {
        alert(res?.message || "Signup failed. Try again!");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[90%] sm:w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* 🖼️ Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-white transition"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-lg"
              />
            ) : (
              <>
                <FaImage className="text-5xl mb-2" />
                <span className="text-sm font-medium">
                  Upload Profile Image
                </span>
              </>
            )}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* 🧾 Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

