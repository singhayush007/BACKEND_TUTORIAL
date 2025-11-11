import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";
import Homepage from "./pages/Homepage.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
