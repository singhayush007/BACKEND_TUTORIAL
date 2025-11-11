import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const SERVER_URL = "http://localhost:8000";

  // 🟢 SIGNUP API (Updated for FormData)
  const signupUserAPI = async (userData) => {
    try {
      console.log("📤 Sending signup data:", userData);

      const isFormData = userData instanceof FormData;

      const res = await fetch(`${SERVER_URL}/signup`, {
        method: "POST",
        headers: isFormData
          ? undefined // browser will set multipart/form-data automatically
          : { "Content-Type": "application/json" },
        body: isFormData ? userData : JSON.stringify(userData),
        credentials: "include",
      });

      console.log("📥 Raw response:", res);

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Signup failed response:", text);
        throw new Error(text || "Signup failed");
      }

      const data = await res.json();
      console.log("✅ Signup response data:", data);

      return data;
    } catch (err) {
      console.error("🚨 Signup error:", err);
      return { message: "Signup failed or server error" };
    }
  };

  // 🟢 LOGIN API
  const loginUserAPI = async (email, password) => {
    try {
      const res = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Login failed response:", text);
        throw new Error(text || "Login failed");
      }

      const data = await res.json();
      console.log("✅ Login success:", data);
      return data;
    } catch (err) {
      console.error("🚨 Login error:", err);
      return { message: "Invalid credentials or server error" };
    }
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        loginUser,
        logoutUser,
        loginUserAPI,
        signupUserAPI,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUserContext = () => useContext(UserContext);
