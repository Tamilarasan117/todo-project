import express from "express";
import todoController from "../controllers/todo.controller.js";
import { authProtect } from "../middlewares/auth.protect.middleware.js";
import {
  validateAddTodo,
  validateDeleteTodo,
} from "../middlewares/todo.validation.middleware.js";
import { validateUser } from "../middlewares/auth.validation.middleware.js";

const {
  getAllTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  getUserTodo,
  getTodoByStatus,
  getTodoByDateRange,
} = todoController();

export const todoRouter = express.Router();

todoRouter.get("/todo/get-all-todo", authProtect, getAllTodo);
todoRouter.post(
  "/todo/add-todo",
  authProtect,
  validateUser,
  validateAddTodo,
  addTodo
);
todoRouter.put("/todo/update-todo/:id", authProtect, validateUser, updateTodo);
todoRouter.delete(
  "/todo/delete-todo/:id",
  authProtect,
  validateUser,
  validateDeleteTodo,
  deleteTodo
);
todoRouter.get(
  "/todo/get-user-todo/:userId",
  authProtect,
  validateUser,
  getUserTodo
);
todoRouter.get(
  "/todo/get-todo-by-status",
  authProtect,
  validateUser,
  getTodoByStatus
);
todoRouter.get(
  "/todo/get-todo-by-date-range",
  authProtect,
  validateUser,
  getTodoByDateRange
);
