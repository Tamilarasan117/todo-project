export interface IAPIUserData {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: number;
  updated_at: number;
};

export interface IAPIRegister {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export interface IAPILogin {
  email: string;
  password: string;
};

export interface IAPIChangePassword {
  password: string;
  confirm_password: string;
};

export type TodoStatusType = {
  status: "Pending" | "InProgress" | "Completed";
}

export interface IAPITodoData {
  id: string;
  task: string;
  status: TodoStatusType;
  user_id: string;
  created_at: number;
  updated_at: number;
};

export interface IAPIAddTodo {
  task: string;
  status: TodoStatusType;
};

