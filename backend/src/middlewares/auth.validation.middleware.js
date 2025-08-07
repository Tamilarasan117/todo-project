import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";

const { getUserByEamil, getUserById } = authService();

function validateEmail(email) {
  const regax = /^[a-zA-Z0-9._]+@[a-zA-Z-09.-]+\.[a-zA-Z]{2,}$/;
  return regax.test(email);
};

function validatePassword(password) {
  if (!/^(?=.*[A-Z])/.test(password)) {
    return { message: "Atleast one upper case required", type: "error" };
  }

  if (!/^(?=.*[a-z])/.test(password)) {
    return { message: "Atleast one lower case required", type: "error" };
  }

  if (!/^(?=.*[0-9])/.test(password)) {
    return { message: "Atleast one number required", type: "error" };
  }

  if (!/^(?=.*[~!@#$%^&*()_+])/.test(password)) {
    return { message: "Atleast one special character required", type: "error" };
  }

  if (!/^.{6,}/.test(password)) {
    return { message: "Min 6 character required", type: "error" };
  }

  return null;
};

export const validateUser = async (request, response, next) => {
  const { userId } = request.params;
  const user_id = request.userId;
  
  const user = await getUserById(userId ?? user_id);
  if (!user) {
    return response.status(404).json({ message: "User not found", type: "error" });
  };

  next();
};

export const validateRegister = async (request, response, next) => {
  const { username, email, password, confirmPassword } = request.body;
  if (!username || !email || !password || !confirmPassword) {
    return response.status(400).json({ message: "Please provide required fields", type: "error" });
  };

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return response.status(400).json({ message: "Invalid email address", type: "error" });
  };

  const existUser = await getUserByEamil(email);
  if (existUser) {
    return response.status(409).json({ message: "Email already exist", type: "error" });
  };

  const passwordError = validatePassword(password);
  if (passwordError) {
    return response.status(400).json({ message: passwordError.message, type: passwordError.type });
  };

  const isPasswordMatch = password !== confirmPassword;
  if (isPasswordMatch) {
    return response.status(400).json({ message: "Password not matching", type: "error" });
  };

  next();
};

export const validateLogin = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ message: "PLease provide required fields", type: "error" });
  };

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return response.status(400).json({ message: "Invalid email address", type: "error" });
  };

  next();
};

export const validateChangePassword = async (request, response, next) => {
  const { oldPassword, newPassword, confirmPassword } = request.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return response.status(400).json({ message: "Please provid required fields", type: "error" });
  };

  const { userId } = request.params;
  const user = await getUserById(userId);
  const matchPassword = await bcrypt.compare(oldPassword, user.password);
  if (!matchPassword) {
    return response.status(400).json({ message: "Invalid old password", type: "error" });
  };

  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    return response.status(400).json({ message: passwordError.message, type: passwordError.type });
  };

  const isPasswordMatch = newPassword !== confirmPassword;
  if (isPasswordMatch) {
    return response.status(400).json({ message: "Password not matching", type: "error" });
  };

  next();
};
