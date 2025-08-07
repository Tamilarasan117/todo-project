import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authService from "../services/auth.service.js";
import generateTokens from "../utils/generateTokens.js";
import hashPassword from "../utils/hashPassword.js";

dotenv.config();

const authController = () => {
  const {
    changeUserPassword,
    getUserById,
    getUserByEamil,
    registerUser,
    updateUser,
  } = authService();

  const register = async (request, response) => {
    try {
      const { username, email, password } = request.body;
      const hashedPassword = await hashPassword(password);

      await registerUser(username, email, hashedPassword);
      
      return response.status(200).json({ message: "Account created successfully", type: "success" });
    } catch (error) {
      console.error("Error during registration:", error);
      return response.status(500).json({ message: "Something went wrong during registering", type: "error" });
    }
  };

  const login = async (request, response) => {
    try {
      const { email, password } = request.body;

      const userData = await getUserByEamil(email);
      if (!userData) {
        return response.status(404).json({ message: "Invalid credintails", type: "error" });
      }

      const matchPassword = await bcrypt.compare(password, userData.password);
      if (matchPassword) {
        generateTokens(response, userData);
        await updateUser(email);

        return response.status(200).json({ message: "Logged in successfully", type: "success", data: userData });
      } else {
        return response.status(404).json({ message: "Invalid credintails", type: "error" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return response.status(500).json({ message: "Something went wrong during login", type: "error" });
    }
  };

  const logout = async (request, response) => {
    try {
      response.clearCookie("accessToken");
      response.status(200).json({ message: "Logged out successfully", type: "success" });
    } catch (error) {
      console.error("Error during logout:", error);
      return response.status(500).json({ message: "Something went wrong during logout", type: "error" });
    }
  };

  const refreshToken = async (request, response) => {
    try {
      const { refreshToken } = request.cookies;
      if (!refreshToken) {
        return response.status(401).json({ message: "Unauthorized: No token provided", type: "error" });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const { userId } = decoded;

      const userData = await getUserById(userId);
      if (!userData) {
        return response.status(404).json({ message: "User not found", type: "error" });
      }

      generateTokens(response, userData);
      return response.send(userData);
    } catch (error) {
      console.error("Access token verification failed:", error);
      return response.status(403).json({ message: "Not authorized, access token failed.", type: "error" });
    }
  };

  const changePassword = async (request, response) => {
    try {
      const { userId } = request.params;
      const { newPassword } = request.body;
      const hashedPassword = await hashPassword(newPassword);
      
      await changeUserPassword(userId, hashedPassword);

      return response.status(200).json({ message: "Password changed successfully", type: "success" });
    } catch (error) {
      console.error("Error during change password:", error);
      return response.status(500).json({ message: "Something went wrong during change password", type: "error" });
    }
  };

  return { register, login, logout, refreshToken, changePassword };
};

export default authController;
