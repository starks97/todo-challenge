import { Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { TodoProps } from "../TodoContext";
import { TodoState } from "../TodoProvider";

import { TodoActionType } from "../todoReducer";

export interface Props {
  title: string;
  description: string;
  color: string;
  dispatch: Dispatch<TodoActionType>;
  todoState: TodoState;
}

export interface TodoWithActionOptions extends TodoProps {
  dispatch: Dispatch<TodoActionType>;
}

export interface TodoActionState extends TodoWithActionOptions {
  todoState: TodoState
}

export interface TaskProps {
  title: string;
  completed: boolean;
  dispatch: Dispatch<TodoActionType>;
  todoSelected: TodoProps;
}

export interface TaskPropsWithActionOptions extends TaskProps {
  userId: string;
  id: string;
  todoId: string;
}

export interface TP extends TaskPropsWithActionOptions {
  todoState: TodoState;
}

export const handleCreateTodo_from_DB = async ({
  title,
  description,
  color,
  dispatch,
  todoState,
}: Props): Promise<boolean | null> => {
  try {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, color }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const todoCreated = await response.json();

    const { todo } = todoCreated;

    dispatch({
      type: "[Todo] -  Create a todo",
      payload: [...todoState.todos, todo],
    });

    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleDeleteTodo_from_DB = async ({
  dispatch,
  ...todo
}: TodoWithActionOptions) => {
  try {
    const response = await fetch(`/api/todo/${todo.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({
      type: "[Todo] - Delete Todo",
      payload: todo,
    });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleUpdateTodo_from_DB = async ({
  dispatch,
  todoState,
  ...todo
}: TodoActionState) => {
  try {
    const response = await fetch(`/api/todo/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const updateToDo = todoState.todos!.map((element) => {
      if (element.id !== todo.id) return element;

      return todo;
    });

    dispatch({
      type: "[Todo] - Update Todo",
      payload: updateToDo,
    });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleCreateTask_from_DB = async ({
  title,
  completed,
  dispatch,
  todoSelected,
}: TaskProps): Promise<Task | null> => {
  try {
    const response = await fetch(`/api/tasks/${todoSelected.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed }),
    });

    if (!response.ok) return null;

    const { createTasks } = await response.json();

    dispatch({
      type: "[Todo] - Create task",
      payload: createTasks,
    });

    return createTasks;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleDeleteTask_from_DB = async ({dispatch, ...task}: TaskPropsWithActionOptions):Promise<Task| null> => {
  try {
    const response = await fetch(`/api/tasks/${task.id}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("somenthing went wrong ");
    }


    dispatch({ type: "[Todo] - Delete task", payload: task });

    return task;

  } catch (e) {
    console.log(e);
    return null;
  }
}

export const handleUpdateTask_from_DB = async ({dispatch, ...task}: TaskPropsWithActionOptions) => {
  try {
    const response = await fetch(`/api/tasks/${task.id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("somenthing went wrong ");
    }

    dispatch({ type: "[Todo] - Update task", payload: task });

    return task;
  } catch (e) {
    console.log(e);
    return null;
  }

}
