import { Dispatch } from "react";
import { generateId } from "../../../app/backend/utils";
import { TodoState } from "../TodoProvider";
import { TodoActionType } from "../todoReducer";

interface Props {
  title: string;
  description: string;
  color: string;
  dispatch: Dispatch<TodoActionType>;
  todoState: TodoState;
}

export const handleCreateTodo_from_LS = ({
  title,
  description,
  color,
  dispatch,
  todoState,
}: Props) => {
  try {
    const todoCreated = {
      title,
      description,
      color,
      completed: false,
      id: generateId(),
    };

    localStorage.setItem(
      "todos",
      JSON.stringify([...todoState.todos, todoCreated])
    );

    dispatch({
      type: "[Todo] -  Create a todo",
      payload: [...todoState.todos, todoCreated],
    });

    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};
