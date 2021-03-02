export interface Todo {
  _id: string;
  title?: string;
  description?: string;
  completed?: boolean;
  _version?: number;
  _lastUpdatedAt?: number;
}

export type TodoCreate = Omit<Todo, "_id">;
export type TodoChange = Omit<
  Pick<Todo, "_id"> & Partial<TodoCreate>,
  "_lastUpdatedAt" | "__typename"
>;
export interface User {
  _id: string;
  name: string;
  _version?: number;
  _lastUpdatedAt?: number;
}

export type UserCreate = Omit<User, "_id">;
export type UserChange = Omit<
  Pick<User, "_id"> & Partial<UserCreate>,
  "_lastUpdatedAt" | "__typename"
>;
