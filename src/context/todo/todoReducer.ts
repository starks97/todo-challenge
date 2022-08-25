import { TaskProps, TodoState } from ".";

type TodoActionType = { type: "[Todo] -  Create a todo"; payload: TaskProps[] };

export const TodoReducer = (
  state: TodoState,
  action: TodoActionType
): TodoState => {
  switch (action.type) {
    case "[Todo] -  Create a todo":
      return {
        ...state,
        todo: action.payload,
      };
    default:
      return state;
  }
};
