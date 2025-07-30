import bcrypt from "bcrypt";
import { getDatabase } from "../configs/dbConnection.js";

const authService = () => {
  async function validateEmail(email) {
    const regax = /^[a-zA-Z0-9._]+@[a-zA-Z-09.-]+\.[a-zA-Z]{2,}$/;

    if (!regax.test(email)) {
      return { message: "Not a valid email", type: "error" };
    }
    return false;
  }

  async function getUserById(userId) {
    const getUserQuery = "SELECT * FROM users WHERE id = ?;";
    return await getDatabase().get(getUserQuery, [userId]);
  }

  async function getUserByEamil(email) {
    const getUserQuery = "SELECT * FROM users WHERE email = ?;";
    return await getDatabase().get(getUserQuery, [email]);
  }

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
      return {
        message: "Atleast one special character required",
        type: "error",
      };
    }

    if (!/^.{6,}/.test(password)) {
      return { message: "Min 6 character required", type: "error" };
    }

    return null;
  }

  async function registerUser(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserQuery = `
      INSERT INTO users(id, username, email, password, created_at) VALUES(?, ?, ?, ?, ?);
    `;
    await getDatabase().run(createUserQuery, [
      `U_${new Date().getTime()}`,
      username,
      email,
      hashedPassword,
      new Date().getTime(),
    ]);
  }

  async function updateUser(email) {
    const timestamp = new Date().getTime();
    const updateUserQuery = `UPDATE users SET updated_at = ? WHERE email = ?;`;
    await getDatabase().get(updateUserQuery, [timestamp, email]);
  }

  async function changeUserPassword(userId, password) {
    const timestamp = new Date().getTime();
    const hashPassword = await bcrypt.hash(password, 10);
    const changePassQuery = `UPDATE users SET password = ?, updated_at = ? WHERE id = ?;`;

    getDatabase().run(changePassQuery, [hashPassword, timestamp, userId]);
  }

  return {
    changeUserPassword,
    getUserById,
    getUserByEamil,
    registerUser,
    updateUser,
    validateEmail,
    validatePassword,
  };
};

export default authService;
