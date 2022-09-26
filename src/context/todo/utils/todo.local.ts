import { generateId } from "../../../app/backend/utils";

import { TodoProps } from "../TodoContext";

import {
  Props,
  TodoWithActionOptions,
  TodoActionState,
  TaskProps,
  TaskPropsWithActionOptions,
  TP,
} from ".";
import { Task } from "@prisma/client";

export const handleCreateTodo_from_LS = ({
  title,
  description,
  color,
  dispatch,
  todoState,
}: Props) => {
  try {
    const todoCreated = {
      title,
      description,
      color,
      completed: false,
      id: generateId(),
      tagIds: [],
      tasks: [],
    };

    localStorage.setItem(
      "todos",
      JSON.stringify([...todoState.todos, todoCreated])
    );

    dispatch({
      type: "[Todo] -  Create a todo",
      payload: [...todoState.todos, todoCreated],
    });

    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleDeleteTodo_from_Ls = ({
  dispatch,
  ...todo
}: TodoWithActionOptions) => {
  try {
    const todos = JSON.parse(localStorage.getItem("todos") || "[]");

    const newTodos = todos.filter((t: TodoProps) => t.id !== todo.id);

    localStorage.setItem("todos", JSON.stringify(newTodos));

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

export const handleUpdateTodo_from_Ls = ({
  dispatch,
  todoState,
  ...todo
}: TodoActionState) => {
  try {
    const newTodos = todoState.todos.map((t: TodoProps) => {
      if (t.id === todo.id) {
        return todo;
      }
      return t;
    });

    localStorage.setItem("todos", JSON.stringify(newTodos));

    dispatch({
      type: "[Todo] - Update Todo",
      payload: newTodos,
    });
    return true;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleCreateTask_from_Ls = ({
  title,
  completed,
  dispatch,
  todoSelected,
}: TaskProps) => {
  try {
    const newTask = {
      title,
      completed,
      id: generateId(),
      todoId: todoSelected.id,
      userId: "",
    };

    const oldTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    localStorage.setItem("tasks", JSON.stringify([...oldTasks, newTask]));

    dispatch({
      type: "[Todo] - Create task",
      payload: newTask,
    });

    return newTask;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleDeleteTask_from_Ls = ({
  dispatch,
  todoSelected,
  ...task
}: TaskPropsWithActionOptions) => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    const newTask = tasks.filter((t: Task) => t.id !== task.id);

    localStorage.setItem("tasks", JSON.stringify(newTask));

    dispatch({
      type: "[Todo] - Delete task",
      payload: task,
    });

    return newTask;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const handleUpdateTask_from_Ls = ({
  dispatch,
  todoSelected,
  todoState,
  ...task
}: TP) => {
  try {
    const newTask = todoState.todos.find(todo => todo.id === todoSelected.id)?.tasks!.map((t: Task) => {
      if (t.id === task.id) {
        return task;
      }
      return t;

    })

    if(newTask === undefined) return null

    localStorage.setItem("tasks", JSON.stringify(newTask));


    dispatch({
      type: "[Todo] - Update tasks",
      payload: newTask,
    })


    return newTask;
  } catch (e) {
    console.log(e);
    return null;
  }
};
