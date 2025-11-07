import express from "express";
import {
  createUser,
  getAllUsers,
  getUserByName,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/user", createUser);
userRouter.get("/read", getAllUsers);
userRouter.get("/read/:name", getUserByName);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
