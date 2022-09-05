import { createContext } from "react";

export interface TodoProps {
  title: string;
  description: string;
  completed: boolean;
  color: string;
  id: string;
}

interface ContextProps {
  todos: TodoProps[];
  createTodo: (
    title: string,
    description: string,
    color: string
  ) => Promise<boolean | null>;
  deleteTodo: (task: TodoProps) => void;
  updateTodo: (task: TodoProps) => Promise<null | undefined>;
}

export const TodoContext = createContext({} as ContextProps);
