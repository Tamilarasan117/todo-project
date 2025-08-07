import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import getFilePath from "../utils/filePath.js";

const dbPath = path.join(getFilePath(import.meta.url), "../todoDatabase.db");

let database = null;
export const connectDatabase = async () => {
  try {
    database = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Database connected successfully.");

    const userSchema = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
      );
    `;

    const todoSchema = `
      CREATE TABLE IF NOT EXISTS todos (
        id TEXT PRIMARY KEY,
        task TEXT NOT NULL,
        status TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `;

    database.run(userSchema, (error) => {
      if (error) {
        console.log('Error while creating users table.', error.message);
      } else {
        console.log('users table created successfully.');
      }
    });

    database.run(todoSchema, (error) => {
      if (error) {
        console.log('Error while creating todos table.', error.message);
      } else {
        console.log('todos table created successfully.');
      }
    });

    return database;
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1);
  } 
};

export const getDatabase = () => {
  if (!database) {
    console.log("Database not connected. Call connectDatabase() function.");
  }
  return database;
};
