import { TodoProps, TodoState } from ".";

export type TodoActionType =
  | { type: "[Todo] -  Create a todo"; payload: TodoProps[] }
  | { type: "[Todo] - LoadTodo from DB | storage"; payload: TodoProps[] }
  | { type: "[Todo] - Delete Todo"; payload: TodoProps }
  | { type: "[Todo] - Update Todo"; payload: TodoProps[] }
  | { type: "[Todo] - Set Tag to Todo"; payload: TodoProps };

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
    default:
      return state;
  }
};
