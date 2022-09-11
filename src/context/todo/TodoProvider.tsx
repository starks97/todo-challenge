import { FC, useReducer, useEffect, useContext } from "react";
import { TodoProps, TodoContext, TodoReducer } from ".";

import { AuthContext } from "../auth";
import { handleCreateTodo_from_DB, handleCreateTodo_from_LS } from "./utils";

export interface TodoState {
  todos: TodoProps[];
}

const TODO_INITIAL_STATE: TodoState = {
  todos: [],
};

export const TodoProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todoState, dispatch] = useReducer(TodoReducer, TODO_INITIAL_STATE);
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
      const response = await fetch("/api/todo/getTodos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response) return null;

      const { todos } = await response.json();

      dispatch({ type: "[Todo] - LoadTodo from DB | storage", payload: todos });
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
    try {
      const response = await fetch(`/api/todo/deleteTodo/?id=${todo.id}`, {
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
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const updateTodo = async (todo: TodoProps) => {
    try {
      const response = await fetch(`/api/todo/update_todo/?id=${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const updateToDo = todoState.todos.map((element) => {
        if (element.id !== todo.id) return element;

        return todo;
      });

      dispatch({
        type: "[Todo] - Update Todo",
        payload: updateToDo,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <TodoContext.Provider
      value={{ ...todoState, createTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
