import { createContext } from "react";

export interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  todoId: string;
  userId: string;
}

export interface ContextProps {
  tasks: TaskProps[];
  createTask: (title: string, completed: boolean) => Promise<boolean | null>;
}

export const TaskContext = createContext({} as ContextProps);
