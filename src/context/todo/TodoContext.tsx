import { createContext, Dispatch, SetStateAction } from "react";

export interface TodoProps {
  title: string;
  description: string;
  completed: boolean;
  color: string;
  id: string;
  tagIds: string[];
}

interface ContextProps {
  todos: TodoProps[];
  createTodo: (
    title: string,
    description: string,
    color: string
  ) => Promise<boolean | null>;
  deleteTodo: (task: TodoProps) => void;
  updateTodo: (todo: TodoProps) => Promise<true | null>;
  setTag: ({ tagIds }: TodoProps) => Promise<true | null>;
  todoSelected: TodoProps;
  setTodoSelected: Dispatch<SetStateAction<TodoProps>>;
}

export const TodoContext = createContext({} as ContextProps);
