import { FC, useReducer, useEffect } from "react";
import { TodoProps, TodoContext, TodoReducer } from ".";

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
    dispatch({
      type: "[Todo] - Delete Todo",
      payload: todo,
    });
  };

  return (
    <TodoContext.Provider value={{ ...todoState, createTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
