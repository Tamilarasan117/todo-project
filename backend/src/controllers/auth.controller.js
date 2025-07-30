import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authService from "../services/auth.service.js";
import { generateTokens } from "../utils/generateTokens.js";

dotenv.config();

const authController = () => {
  const {
    changeUserPassword,
    getUserById,
    getUserByEamil,
    registerUser,
    updateUser,
    validateEmail,
    validatePassword,
  } = authService();

  const register = async (request, response) => {
    try {
      const { username, email, password, confirmPassword } = request.body;
      if (!username || !email || !password || !confirmPassword) {
        return response
          .status(400)
          .json({ message: "Please provide required fields", type: "error" });
      }

      const isValidEmail = await validateEmail(email);
      if (isValidEmail) {
        return response
          .status(400)
          .json({ message: isValidEmail.message, type: isValidEmail.type });
      } else {
        const existUser = await getUserByEamil(email);
        if (!existUser) {
          const validatedPassword = validatePassword(password);
          if (validatedPassword) {
            return response.status(400).json({
              message: validatedPassword.message,
              type: validatedPassword.type,
            });
          }

          if (password !== confirmPassword) {
            return response
              .status(400)
              .json({ message: "Password not matching", type: "error" });
          }

          await registerUser(username, email, password);

          return response.status(200).json({
            message: "Account created successfully",
            type: "success",
          });
        } else {
          return response
            .status(409)
            .json({ message: "Email already exist", type: "error" });
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return response.status(500).json({
        message: "Something went wrong during registering",
        type: "error",
      });
    }
  };

  const login = async (request, response) => {
    try {
      const { email, password } = request.body;
      if (!email || !password) {
        return response
          .status(400)
          .json({ message: "Please provide required fields", type: "error" });
      }

      const isValidEmail = await validateEmail(email);
      if (isValidEmail) {
        return response
          .status(400)
          .json({ message: isValidEmail.message, type: isValidEmail.type });
      } else {
        const userData = await getUserByEamil(email);
        if (!userData) {
          return response
            .status(404)
            .json({ message: "Invalid credintails", type: "error" });
        }

        const matchPassword = await bcrypt.compare(password, userData.password);
        if (matchPassword) {
          generateTokens(response, userData);
          await updateUser(email);

          return response
            .status(200)
            .json({ message: "Logged in successfully", type: "success" });
        } else {
          return response
            .status(404)
            .json({ message: "Invalid credintails", type: "error" });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      return response.status(500).json({
        message: "Something went wrong during login",
        type: "error",
      });
    }
  };

  const logout = async (request, response) => {
    try {
      response.clearCookie("accessToken");
      response
        .status(200)
        .json({ message: "Logged out successfully", type: "success" });
    } catch (error) {
      console.error("Error during logout:", error);
      return response.status(500).json({
        message: "Something went wrong during logout",
        type: "error",
      });
    }
  };

  const refreshToken = async (request, response) => {
    try {
      const { refreshToken } = request.cookies;
      if (!refreshToken) {
        return response
          .status(401)
          .json({ message: "Unauthorized: No token provided", type: "error" });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const { userId } = decoded;

      const userData = await getUserById(userId);
      if (!userData) {
        return response
          .status(404)
          .json({ message: "User not found", type: "error" });
      }

      generateTokens(response, userData);
      return response.send(userData);
    } catch (error) {
      console.error("Access token verification failed:", error);
      return response.status(403).json({
        message: "Not authorized, access token failed.",
        type: "error",
      });
    }
  };

  const changePassword = async (request, response) => {
    try {
      const { userId } = request.params;
      const { oldPassword, newPassword, confirmPassword } = request.body;

      const userData = await getUserById(userId);
      if (!userData) {
        return response
          .status(404)
          .json({ message: "User not found", type: "error" });
      }

      const matchPassword = await bcrypt.compare(
        oldPassword,
        userData.password
      );
      if (matchPassword) {
        const validatedPassword = validatePassword(newPassword);
        if (validatedPassword) {
          return response.status(400).json({
            message: validatedPassword.message,
            type: validatedPassword.type,
          });
        }

        if (newPassword !== confirmPassword) {
          return response
            .status(400)
            .json({ message: "Password not matching", type: "error" });
        }

        await changeUserPassword(userId, newPassword);

        return response
          .status(200)
          .json({ message: "Password changed successfully", type: "success" });
      } else {
        return response
          .status(400)
          .json({ message: "Invalid old password", type: "error" });
      }
    } catch (error) {
      console.error("Error during change password:", error);
      return response.status(500).json({
        message: "Something went wrong during change password",
        type: "error",
      });
    }
  };

  return { register, login, logout, refreshToken, changePassword };
};

export default authController;
