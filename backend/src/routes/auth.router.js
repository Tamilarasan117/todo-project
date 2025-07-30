import express from "express";
import authController from "../controllers/auth.controller.js";
import { authProtect } from "../middlewares/auth.middleware.js";

const { register, login, logout, refreshToken, changePassword } =
  authController();

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authProtect, logout);
authRouter.post("/refresh-token", authProtect, refreshToken);
authRouter.post("/change-password/:userId", authProtect, changePassword);
