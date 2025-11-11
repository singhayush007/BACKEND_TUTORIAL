import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // wait for redirect

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.name || "User"} 👋</h1>
      <p className="text-gray-400 text-lg mb-6">You have successfully logged in!</p>

      <button
        onClick={() => {
          logoutUser();
          navigate("/login");
        }}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Homepage;
