import bcrypt from "bcrypt";
import { getDatabase } from "../configs/dbConnection.js";
import generateTimestamp from "../utils/geberateID.js";

const authService = () => {
  async function getUserById(userId) {
    try {
      const selectQuery = "SELECT * FROM users WHERE id = ?;";
      const result = getDatabase().get(selectQuery, [userId]);
      return result;
    } catch (error) {
      console.log("Database error in getUserById: ", error.message);
      throw new Error("Failed to fetch user.");
    }
  }

  async function getUserByEamil(email) {
    try {
      const selectQuery = "SELECT * FROM users WHERE email = ?;";
      const result = getDatabase().get(selectQuery, [email]);
      return result;
    } catch (error) {
      console.log("Database error in getUserByEmail: ", error.message);
      throw new Error("Failed to fetch user");
    }
  }

  async function registerUser(username, email, password) {
    try {
      const insertQuery = `
        INSERT INTO users(id, username, email, password, created_at) VALUES(?, ?, ?, ?, ?);
      `;
      
      const result = getDatabase().run(insertQuery, [
        `U_${generateTimestamp(new Date())}`,
        username,
        email,
        password,
        generateTimestamp(new Date()),
      ]);
      return result;
    } catch (error) {
      console.log("Database error in registerUser: ", error.message);
      throw new Error("Failed to register");
    }
  }

  async function updateUser(email) {
    try {
      const timestamp = generateTimestamp(new Date());
      const updateQuery = `UPDATE users SET updated_at = ? WHERE email = ?;`;
      const result = getDatabase().get(updateQuery, [timestamp, email]);
      return result;
    } catch (error) {
      console.log("Database error in updateUser: ", error.message);
      throw new Error("Failed to update user");
    }
  }

  async function changeUserPassword(userId, password) {
    try {
      const timestamp = generateTimestamp(new Date());
      const updateQuery = `UPDATE users SET password = ?, updated_at = ? WHERE id = ?;`;
      const result = getDatabase().run(updateQuery, [password, timestamp, userId]);
      return result;
    } catch (error) {
      console.log('Database error in changeUserPassword: ', error.messgae);
      throw new Error("Failed to change password");
    }
  }

  return {
    changeUserPassword,
    getUserById,
    getUserByEamil,
    registerUser,
    updateUser,
  };
};

export default authService;
