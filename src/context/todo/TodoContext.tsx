import { createContext } from "react";
import { ToDo } from "@prisma/client";

export interface TaskProps {
  title: string;
  description: string;
  completed: boolean;
  color: string;
  id: string;
}

interface ContextProps {
  todo: TaskProps[];
  createTodo: (title: string, description: string, color: string) => Promise<boolean | null>
}

export const TodoContext = createContext({} as ContextProps);
