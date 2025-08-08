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
      
      return response.status(200).json({ message: "Account created successfully", type: "SUCCESS" });
    } catch (error) {
      console.error("Error during registration:", error);
      return response.status(500).json({ message: "Internal server error", type: "ERROR" });
    }
  };

  const login = async (request, response) => {
    try {
      const { email, password } = request.body;

      const userData = await getUserByEamil(email);
      if (!userData) {
        return response.status(404).json({ message: "Invalid credintails", type: "ERROR" });
      }

      const matchPassword = await bcrypt.compare(password, userData.password);
      if (matchPassword) {
        const { accessToken, refreshToken } = generateTokens(userData);
        await updateUser(email);
        return response.status(200).json({
          message: "User successfully logged in",
          type: "SUCCESS",
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      } else {
        return response.status(404).json({ message: "Invalid credintails", type: "ERROR" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return response.status(500).json({ message: "Internal server error", type: "ERROR" });
    }
  };

  const logout = async (request, response) => {
    try {
      response.status(200).json({ message: "User successfully logged out", type: "SUCCESS" });
    } catch (error) {
      console.error("Error during logout:", error);
      return response.status(500).json({ message: "Internal server error", type: "ERROR" });
    }
  };

  const refreshToken = async (request, response) => {
    try {
      const { refreshToken: clientRefreshToken } = request.body;
      if (!clientRefreshToken) {
        return response.status(401).json({ message: "Unauthorized	No refresh token provided by the client", type: "ERROR" });
      };

      const decoded = jwt.verify(
        clientRefreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const { userId } = decoded;

      const userData = await getUserById(userId);
      if (!userData) {
        return response.status(404).json({ message: "User not found", type: "ERROR" });
      };

      const { accessToken, refreshToken } = generateTokens(userData);
      return response.status(200).json({
        message: "Access token successfully refreshed",
        type: "SUCCESS",
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } catch (error) {
      console.error("Access token verification failed:", error);
      return response.status(500).json({ message: "Internal server error", type: "ERROR" });
    }
  };

  const changePassword = async (request, response) => {
    try {
      const { userId } = request;
      const { newPassword } = request.body;
      const hashedPassword = await hashPassword(newPassword);
      
      await changeUserPassword(userId, hashedPassword);

      return response.status(200).json({ message: "User password successfully changed", type: "SUCCESS" });
    } catch (error) {
      console.error("Error during change password:", error);
      return response.status(500).json({ message: "Internal server error", type: "ERROR" });
    }
  };

  return { register, login, logout, refreshToken, changePassword };
};

export default authController;
