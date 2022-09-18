import { Task } from "@prisma/client";
import { TodoProps, TodoState } from ".";

export type TodoActionType =
  | { type: "[Todo] -  Create a todo"; payload: TodoProps[] }
  | { type: "[Todo] - LoadTodo from DB | storage"; payload: TodoProps[] }
  | { type: "[Todo] - Delete Todo"; payload: TodoProps }
  | { type: "[Todo] - Update Todo"; payload: TodoProps[] }
  | { type: "[Todo] - Set Tag to Todo"; payload: TodoProps }
  | { type: "[Todo] - Create task"; payload: Task }
  | { type: "[Todo] - Delete task"; payload: Task }
  | { type: "[Todo] - Update task"; payload: Task };

/*export enum TodoActionEnum {
  TODO_CREATE = "[Todo] -  Create a todo" //todo.create
  
}*/

export const TodoReducer = (
  state: TodoState,
  action: TodoActionType
): TodoState => {
  switch (action.type) {
    case "[Todo] - LoadTodo from DB | storage":
      return {
        ...state,
        todos: action.payload,
      };
    case "[Todo] -  Create a todo":
      return {
        ...state,
        todos: [...action.payload],
      };

    case "[Todo] - Delete Todo":
      return {
        ...state,
        todos: state.todos.filter((item) => !(item.id === action.payload.id)),
      };

    case "[Todo] - Update Todo":
      return {
        ...state,
        todos: [...action.payload],
      };

    case "[Todo] - Set Tag to Todo":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              tagIds: action.payload.tagIds,
            };
          }
          return item;
        }),
      };

    case "[Todo] - Create task":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload.todoId) {
            return {
              ...item,
              tasks: [...item.tasks, action.payload],
            };
          }
          return item;
        }),
      };

    case "[Todo] - Delete task":
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload.todoId) {
            return {
              ...item,
              tasks: item.tasks.filter((task) => task.id !== action.payload.id),
            };
          }
          return item;
        }),
      };

    case "[Todo] - Update task":
      return {
        ...state,

        todos: state.todos.map((item) => {
          if (item.id === action.payload.todoId) {
            return {
              ...item,
              tasks: item.tasks.map((task) => {
                if (task.id === action.payload.id) {
                  return {
                    ...task,
                    ...action.payload,
                  };
                }
                return task;
              }),
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};
