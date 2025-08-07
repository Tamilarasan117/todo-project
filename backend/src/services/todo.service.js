import { getDatabase } from "../configs/dbConnection.js";
import generateTimestamp from "../utils/geberateID.js";

const todoService = () => {
  async function getTodoByTask(task) {
    try {
      const selectQuery = `SELECT * FROM todos WHERE task = ?;`;
      const result = getDatabase().get(selectQuery, [task]);
      return result;
    } catch (error) {
      console.log('Database error in getTodoByTask: ', error.messgae);
      throw new Error("Failed to fetch todo");
    }
  };

  async function getTodoById(todoId) {
    try {
      const selectQuery = `SELECT * FROM todos WHERE id = ?;`;
      const result = getDatabase().get(selectQuery, [todoId]);
      return result;
    } catch (error) {
      console.log('Database error in getTodoById: ', error.messgae);
      throw new Error("Failed to fetch todo");
    }
  }

  async function getTodoItems() {
    try {
      const selectQuery = `SELECT * FROM todos;`;
      const result = getDatabase().all(selectQuery, []);
      return result;
    } catch (error) {
      console.log('Database error in getTodoItems: ', error.messgae);
      throw new Error("Failed to fetch todo");
    }
  };

  async function addTodoItem(data) {
    try {
      const timestamp = generateTimestamp(new Date());
      const insertQuery = `
        INSERT INTO todos (id, task, status, user_id, created_at)
        VALUES(?, ?, ?, ?, ?);
      `;
      
      const result = getDatabase().run(insertQuery, [
        `T_${timestamp}`,
        data.task,
        data.status,
        data.user_id,
        timestamp
      ]);

      return result;
    } catch (error) {
      console.log('Database error in getTodoItem: ', error.messgae);
      throw new Error("Failed to fetch todo");
    }
  };

  async function updateTodoItem(data, todoId) {
    try {
      const timestamp = generateTimestamp(new Date());
      const updateQuery = `
        UPDATE todos SET task = ?, status = ?, updated_at = ? WHERE id = ?;
      `;
      
      const result = getDatabase().run(updateQuery, [
        data.task,
        data.status,
        timestamp,
        todoId
      ]);

      return result;
    } catch (error) {
      console.log('Database error in updateTodoItem: ', error.messgae);
      throw new Error("Failed to update todo");
    }
  };

  async function deleteTodoItem(todoId) {
    try {
      const deleteQuery = `DELETE FROM todos WHERE id = ?;`;
      const result = getDatabase().run(deleteQuery, [todoId]);
      return result;
    } catch (error) {
      console.log('Database error in deleteTodoItem: ', error.messgae);
      throw new Error("Failed to delete todo");
    }
  };

  async function getUserTodoItem(userId) {
    try {
      const selectQuery = `SELECT * FROM todos WHERE user_id = ?;`;
      const result = getDatabase().all(selectQuery, [userId]);
      return result;
    } catch (error) {
      console.log('Database error in getUserTodoItem: ', error.messgae);
      throw new Error("Failed to fetch todo");
    }
  }

  async function getTodoItemByStatus(status) {
    try {
      const selectQuery = `SELECT * FROM todos WHERE status = ?;`;
      const result = getDatabase().all(selectQuery, [status]);
      return result;
    } catch (error) {
      console.log('Database error in getTodoItemByStatus: ', error.messgae);
      throw new Error("Failed to fetch todo");
    }
  }

  async function getTodoItemByDateRange(start_date, end_date) {
    try {
      const selectQuery = `SELECT * FROM todos WHERE created_at BETWEEN ? AND ?;`;
      const result = getDatabase().all(selectQuery, [start_date, end_date]);
      return result;
    } catch (error) {
      console.log('Database error in getTodoItemByDateRange: ', error.messgae);
      throw new Error("Failed to fetch todo");
    }
  };

  return {
    getTodoByTask,
    getTodoById,
    getTodoItems,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    getUserTodoItem,
    getTodoItemByStatus,
    getTodoItemByDateRange,
  };
};

export default todoService;
