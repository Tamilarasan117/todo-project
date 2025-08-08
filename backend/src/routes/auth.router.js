import express from "express";
import authController from "../controllers/auth.controller.js";
import { authProtect } from "../middlewares/auth.protect.middleware.js";
import {
  validateChangePassword,
  validateLogin,
  validateRegister,
  validateUser,
} from "../middlewares/auth.validation.middleware.js";

const { register, login, logout, refreshToken, changePassword } =
  authController();

export const authRouter = express.Router();

authRouter.post("/auth/register", validateRegister, register);
authRouter.post("/auth/login", validateLogin, login);
authRouter.post("/auth/logout", authProtect, logout);
authRouter.post("/auth/refresh-token", refreshToken);
authRouter.post(
  "/auth/change-password",
  authProtect,
  validateUser,
  validateChangePassword,
  changePassword
);
