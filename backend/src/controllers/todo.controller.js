import todoService from "../services/todo.service.js";

const todoController = () => {
  const {
    getTodoById,
    getTodoItems,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    getUserTodoItem,
    getTodoItemByStatus,
    getTodoItemByDateRange,
  } = todoService();

  async function getAllTodo(request, response) {
    try {
      const todoItems = await getTodoItems();
      return response.status(200).json({ data: todoItems, message: "Todo items fetched successfully", type: "success" });
    } catch (error) {
      console.log("Error during fetching todo items: ", error.message);
      return response.status(500).json({ message: "Internal server error", type: "error" });
    }
  };

  async function addTodo(request, response) {
    try {
      const { userId } = request;
      const { task, status } = request.body;

      await addTodoItem({
        task: task,
        status: status,
        user_id: userId
      });

      return response.status(200).json({ message: "Todo item created successfully", type: "success" });
    } catch (error) {
      console.log("Error during create new todo ", error.message);
      return response.status(500).json({ message: "Internal server error", type: "error" });
    }
  };

  async function updateTodo(request, response) {
    try {
      const todoId = request.params.id;
      const data = request.body;

      const todo = await getTodoById(todoId);
      if (todo) {
        await updateTodoItem(data, todoId);
        return response.status(200).json({ message: "Task updated successfully" })
      } else {
        return response.status(404).json({ message: "Todo item not found", type: "error" });
      }
    } catch (error) {
      console.log("Error during update todo ", error.message);
      return response.status(500).json({ message: "Internal server error", type: "error" });
    }
  };

  async function deleteTodo(request, response) {
    try {
      const todoId = request.params.id;

      await deleteTodoItem(todoId);

      response.status(200).json({ message: "Todo item deleted successfully", type: "success" });
    } catch (error) {
      console.log("Error during delete todo ", error.message);
      return response.status(500).json({ message: "Internal server error", type: "error" });
    }
  };

  async function getUserTodo(request, response) {
    try {
      const { userId } = request;
      const data = await getUserTodoItem(userId);
      return response.status(200).json({ data: data, message: "Todo item fetched successfully", type: "success" });
    } catch (error) {
      console.log("Error during fetch user todo ", error.message);
      return response.status(500).json({ message: "Internal server error", type: "error" });
    }
  };

  async function getTodoByStatus(request, response) {
    try {
      const status = request.query.status;
      const data = await getTodoItemByStatus(status);
      return response.status(200).json({ data: data, message: "Todo item fetched successfully", type: "success" });
    } catch (error) {
      console.log("Error during fetch todo: ", error.message);
      return response.status(500).json({ message: "Internal server error", type: "error" });
    }
  };

  async function getTodoByDateRange(request, response) {
    try {
      const { start_date, end_date } = request.query;
      const data = await getTodoItemByDateRange(start_date, end_date);
      return response.status(200).json({ data: data, message: "Todo item fetched successfully", type: "success" });
    } catch (error) {
      console.log("Error during fetch todo: ", error.message);
      return response.status(500).json({ message: "Internal server error", type: "error" });
    }
  };

  return {
    addTodo,
    getAllTodo,
    updateTodo,
    deleteTodo,
    getUserTodo,
    getTodoByStatus,
    getTodoByDateRange
  };
};

export default todoController;
