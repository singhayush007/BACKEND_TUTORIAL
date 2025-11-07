import User from "../models/user.model.js";

// ✅ Create User
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error in creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Read All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("❌ Error in fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Read One User by Name
export const getUserByName = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error in fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Update User by ID
export const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error in updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Delete User by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("❌ Error in deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
