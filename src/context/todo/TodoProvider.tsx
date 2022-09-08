import { FC, useReducer, useEffect } from "react";
import { TodoProps, TodoContext, TodoReducer } from ".";

import Cookies from "js-cookie";

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

  useEffect(() => {
    const getTodos = async () => {

      //if(!Cookies.get("token")) return;
      const response = await fetch("/api/todo/getTodos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response) return null;

      const { todos } = await response.json();

      dispatch({ type: "[Todo] - LoadTodo from DB | storage", payload: todos });
    };
    getTodos();
  }, []);

  const createTodo = async (
    title: string,
    description: string,
    color: string
  ): Promise<boolean | null> => {
    try {
      const response = await fetch("/api/todo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, color }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const todoCreated = await response.json();

      const { task } = todoCreated;

      dispatch({
        type: "[Todo] -  Create a todo",
        payload: [...todoState.todos, { ...task }],
      });
      return true;
    } catch (e) {
      console.log(e);
      return null;
    }
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
