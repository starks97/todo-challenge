import { FC, useReducer, useEffect, useContext } from "react";
import { TodoContext } from "../todo";

import { TaskContext, TaskProps } from "./TaskContext";
import { TaskReducer } from "./taskReducer";

export interface TaskState {
  tasks: TaskProps[];
}

const TASK_INITIAL_STATE: TaskState = {
  tasks: [],
};

export const TaskProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [taskState, dispatch] = useReducer(TaskReducer, TASK_INITIAL_STATE);

  const { todoSelected } = useContext(TodoContext);



  const createTask = async (
    title: string,
    completed: boolean
  ): Promise<boolean | null> => {
    try {
      const response = await fetch(`api/tasks/${todoSelected.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed }),
      });

      if (!response) return null;

      const { createTasks } = await response.json();

      dispatch({ type: "Create task", payload: createTasks });

      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <TaskContext.Provider value={{ ...taskState, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};
