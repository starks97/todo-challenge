import { Task } from "@prisma/client";
import { FC, useReducer, useEffect, useContext, useState } from "react";
import { TodoProps, TodoContext, TodoReducer } from ".";

import { AuthContext } from "../auth";

import {
  handleCreateTask_from_DB,
  handleCreateTask_from_Ls,
  handleCreateTodo_from_DB,
  handleCreateTodo_from_LS,
  handleDeleteTask_from_DB,
  handleDeleteTask_from_Ls,
  handleDeleteTodo_from_DB,
  handleDeleteTodo_from_Ls,
  handleUpdateTask_from_DB,
  handleUpdateTask_from_Ls,
  handleUpdateTodo_from_DB,
  handleUpdateTodo_from_Ls,
} from "./utils";

export interface TodoState {
  todos: TodoProps[];
}

const TODO_INITIAL_STATE: TodoState = {
  todos: [],
};

export const Filters = {
  ALL: { callback: (todos: TodoProps[]) => todos, label: "All Todos" },
  COMPLETED: {
    callback: (todos: TodoProps[]) =>
      todos.filter((todo) =>
        todo.tasks?.every((task) => task.completed === true)
      ),
    label: "Completed",
  },
  ACTIVE: {
    callback: (todos: TodoProps[]) =>
      todos.filter(
        (todo) => !todo.tasks?.every((task) => task.completed === true)
      ),
    label: "Active",
  },
};

export type F = keyof typeof Filters;

export const TodoProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todoState, dispatch] = useReducer(TodoReducer, TODO_INITIAL_STATE);

  const [filterBy, setFilterBy] = useState<F>("ALL");

  const [todoSelected, setTodoSelected] = useState<TodoProps>({
    title: "",
    description: "",
    color: "",
    tagIds: [],
    id: "",
    completed: false,
    tasks: [],
  });

  const [todoLoaded, setTodoLoaded] = useState<boolean>(false);

  const { auth, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (isLoading) return;

    if (!auth) {
      const todos = localStorage.getItem("todos") || "[]";
      if (todos) {
        dispatch({
          type: "[Todo] - LoadTodo from DB | storage",
          payload: JSON.parse(todos),
        });
      }
      return;
    }

    const getTodos = async () => {
      const response = await fetch("/api/todo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) return null;

      const { todos } = await response.json();

      dispatch({ type: "[Todo] - LoadTodo from DB | storage", payload: todos });

      setTodoLoaded(true);
    };

    getTodos();
  }, [auth, isLoading]);

  const createTodo = async (
    title: string,
    description: string,
    color: string
  ) => {
    const args = {
      title,
      description,
      color,
      dispatch,
      todoState,
    };

    if (!auth) {
      return handleCreateTodo_from_LS(args);
    }
    const response = await handleCreateTodo_from_DB(args);

    return response;
  };

  const deleteTodo = async (todo: TodoProps) => {
    if (!auth) {
      return handleDeleteTodo_from_Ls({ dispatch, ...todo });
    }

    const response = await handleDeleteTodo_from_DB({ dispatch, ...todo });

    return response;
  };

  const updateTodo = async (todo: TodoProps) => {
    if (!auth) {
      return handleUpdateTodo_from_Ls({ dispatch, todoState, ...todo });
    }

    const response = await handleUpdateTodo_from_DB({
      dispatch,
      todoState,
      ...todo,
    });

    return response;
  };

  const setTag = async ({ tagIds, id: todoId }: TodoProps) => {
    try {
      const response = await fetch(`/api/todo/${todoId}/tags`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tagIds }),
      });

      if (!response.ok) return null;

      const { data } = await response.json();

      dispatch({ type: "[Todo] - Set Tag to Todo", payload: data });

      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const createTask = async (
    title: string,
    completed: boolean
  ): Promise<Task | null> => {
    const args = { title, completed, todoSelected, dispatch };

    if (!auth) {
      return handleCreateTask_from_Ls(args);
    }

    const response = await handleCreateTask_from_DB(args);

    if (!response) return null;

    return response;
  };

  const deleteTask = async (task: Task): Promise<Task | null> => {
    const args = { ...task, dispatch, todoSelected };

    if (!auth) {
      return handleDeleteTask_from_Ls(args);
    }

    const response = await handleDeleteTask_from_DB(args);

    return response;
  };

  const updateTask = async (task: Task) => {

    const args = { dispatch, todoSelected, ...task}

    if(!auth){
      return handleUpdateTask_from_Ls(args )
    }

    const response = await handleUpdateTask_from_DB(args);

    return response
  };

  return (
    <TodoContext.Provider
      value={{
        ...todoState,
        filterBy,
        setFilterBy,
        createTodo,
        deleteTodo,
        updateTodo,
        setTag,
        todoSelected,
        setTodoSelected,
        todoLoaded,
        createTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
