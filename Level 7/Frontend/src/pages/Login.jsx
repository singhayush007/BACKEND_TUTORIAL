// import React, { useState, useContext } from "react";
// import { UserContext } from "../context/UserContext.jsx";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { loginUserAPI, loginUser } = useContext(UserContext);
//   const navigate = useNavigate();

//   // 🧠 State for email and password
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // 🧠 Input change handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // 🧠 Form submit handler (API call via context)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await loginUserAPI(formData.email, formData.password);

//     if (res?.user) {
//       loginUser(res.user);
//       alert("✅ Login successful!");
//       navigate("/dashboard"); // redirect after login (change route as needed)
//     } else {
//       alert(res?.message || "❌ Invalid credentials!");
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
//       <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-[90%] sm:w-[400px]">
//         <h1 className="text-3xl font-bold text-white text-center mb-6">
//           Login
//         </h1>

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//           <div>
//             <label className="block text-gray-300 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-300 mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-md mt-3"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-gray-400 text-sm text-center mt-4">
//           Don’t have an account?{" "}
//           <a href="/signup" className="text-blue-400 hover:underline">
//             Sign up
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;









import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { loginUserAPI, loginUser } = useUserContext();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUserAPI(formData.email, formData.password);
      if (res?.user) {
        loginUser(res.user);
        navigate("/home");
      } else {
        setError(res?.message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-[90%] sm:w-[400px]">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-md mt-3"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
