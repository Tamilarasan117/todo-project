import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";

const { getUserByEamil, getUserById } = authService();

function validateEmail(email) {
  const regax = /^[a-zA-Z0-9._]+@[a-zA-Z-09.-]+\.[a-zA-Z]{2,}$/;
  return regax.test(email);
};

function validatePassword(password) {
  if (!/^(?=.*[A-Z])/.test(password)) {
    return { message: "Atleast one upper case required", type: "ERROR" };
  }

  if (!/^(?=.*[a-z])/.test(password)) {
    return { message: "Atleast one lower case required", type: "ERROR" };
  }

  if (!/^(?=.*[0-9])/.test(password)) {
    return { message: "Atleast one number required", type: "ERROR" };
  }

  if (!/^(?=.*[~!@#$%^&*()_+])/.test(password)) {
    return { message: "Atleast one special character required", type: "ERROR" };
  }

  if (!/^.{6,}/.test(password)) {
    return { message: "Min 6 character required", type: "ERROR" };
  }

  return null;
};

export const validateUser = async (request, response, next) => {
  const { userId } = request.params;
  const user_id = request.userId;
  
  const user = await getUserById(userId ?? user_id);
  if (!user) {
    return response.status(404).json({ message: "User not found", type: "ERROR" });
  };

  next();
};

export const validateRegister = async (request, response, next) => {
  const { username, email, password, confirmPassword } = request.body;
  if (!username || !email || !password || !confirmPassword) {
    return response.status(400).json({ message: "Please provide required fields", type: "ERROR" });
  };

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return response.status(400).json({ message: "Invalid email address", type: "ERROR" });
  };

  const existUser = await getUserByEamil(email);
  if (existUser) {
    return response.status(400).json({ message: "Email already exist", type: "ERROR" });
  };

  const passwordError = validatePassword(password);
  if (passwordError) {
    return response.status(400).json({ message: passwordError.message, type: passwordError.type });
  };

  const isPasswordMatch = password !== confirmPassword;
  if (isPasswordMatch) {
    return response.status(400).json({ message: "Password not matching", type: "ERROR" });
  };

  next();
};

export const validateLogin = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ message: "PLease provide required fields", type: "ERROR" });
  };

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return response.status(400).json({ message: "Invalid email address", type: "ERROR" });
  };

  next();
};

export const validateChangePassword = async (request, response, next) => {
  const { oldPassword, newPassword, confirmPassword } = request.body;
  if (!oldPassword || !newPassword || !confirmPassword) {
    return response.status(400).json({ message: "Please provid required fields", type: "ERROR" });
  };

  const { userId } = request;
  const user = await getUserById(userId);
  const matchPassword = await bcrypt.compare(oldPassword, user.password);
  if (!matchPassword) {
    return response.status(400).json({ message: "Invalid old password", type: "ERROR" });
  };

  const passwordError = validatePassword(newPassword);
  if (passwordError) {
    return response.status(400).json({ message: passwordError.message, type: passwordError.type });
  };

  const isPasswordMatch = newPassword !== confirmPassword;
  if (isPasswordMatch) {
    return response.status(400).json({ message: "Password not matching", type: "ERROR" });
  };

  next();
};
