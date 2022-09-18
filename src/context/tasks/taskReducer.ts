import { TaskProps } from "./TaskContext";
import { TaskState } from "./TaskProvider";

export type TaskActionType =
  | { type: "Create task"; payload: TaskProps[] }
  | { type: "Delete task"; payload: TaskProps }
  | { type: "Update task"; payload: TaskProps[] }
  | { type: "Load task"; payload: TaskProps[] };

export const TaskReducer = (
  state: TaskState,
  action: TaskActionType
): TaskState => {
  switch (action.type) {
    case "Create task":
      return {
        ...state,
        tasks: [...action.payload],
      };

    case "Delete task":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !(task.id === action.payload.id)),
      };

    case "Update task":
      return {
        ...state,
        tasks: [...action.payload],
      };

    case "Load task":
      return {
        ...state,
        tasks: action.payload,
      };

    default:
      return state;
  }
};
