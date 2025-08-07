import todoService from "../services/todo.service.js";

const { getTodoByTask, getTodoById } = todoService();

export const validateAddTodo = async (request, response, next) => {
  const { task, status } = request.body;
  if (!task || !status) {
    return response.status(400).json({ message: "Please provide required fields", type: "error" });
  };

  const todo = await getTodoByTask(task);
  if (todo) {
    return response.status(400).json({ message: "Task already exists", type: "error" });
  };

  next();
};

export const validateDeleteTodo = async (request, response, next) => {
  const { id } = request.params;
  const data = await getTodoById(id);
  if (!data) {
    return response.status(404).json({ message: "Todo item not found", type: "error" });
  };

  next();
};
