import { Filter } from "offix-datastore";
import { Model } from "../../../../packages/datastore/datastore/src/Model";
import {
  useQuery,
  useRemove,
  useSave,
  useUpdate,
} from "../../../../packages/datastore/datastore/src/vue";
import { TodoModel, UserModel } from "./config";
import {
  Todo,
  TodoChange,
  TodoCreate,
  User,
  UserChange,
  UserCreate,
} from "./generated";
// FIXME: how to handle wrong model type from package and from monorepo?
const castModel = <TItem>(model: unknown) => {
  return model as Model<TItem>;
};
const castedTodoModel = castModel<Todo>(TodoModel);
const castedUserModel = castModel<User>(UserModel);

export const useFindTodos = (filter?: Filter<Todo>) =>
  useQuery<Todo>({ model: castedTodoModel, filter: filter });

export const useAddTodo = () => useSave<TodoCreate, Todo>(castedTodoModel);

export const useEditTodo = () => useUpdate<TodoChange, Todo>(castedTodoModel);

export const useDeleteTodo = () => useRemove<Todo>(castedTodoModel);

export const useFindUsers = (filter?: Filter<User>) =>
  useQuery<User>({ model: castedUserModel, filter: filter });

export const useAddUser = () => useSave<UserCreate, User>(castedUserModel);

export const useEditUser = () => useUpdate<UserChange, User>(castedUserModel);

export const useDeleteUser = () => useRemove<User>(castedUserModel);
