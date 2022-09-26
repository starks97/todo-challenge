import { methodSwitcher } from "../../../../app/backend/utils";

import { Todo } from "../../../../app/backend/todo";

export default methodSwitcher({
  PUT: async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      res.statusCode = 400;
      res.send({ message: "Bad Request" });
      return;
    }

    const { id = "" } = req.query as { id: string };

    const {
      title = "",
      description = "",
      color = "",
      completed = false,
    }: {
      title: string;
      description: string;
      color: string;
      completed: boolean;
    } = req.body;

    const updateTodo = await Todo.updateTodo(id, {
      title,
      description,
      color,
      completed,
    });

    if (!updateTodo) {
      return res
        .status(400)
        .send({ code: 400, message: "it can not update a todo" });
    }

    res.status(200).json({ updateTodo });
  },

  DELETE: (req, res) => {
    const { id = "" } = req.query as { id: string };
    const todo = Todo.deleteTodo(`${id}`);
    if (!todo) {
      res.statusCode = 404;
      res.send({ message: "there are not any todos to process" });
      return;
    }

    return res.status(200).json({
      message: "the todo was successfully deleted",
    });
  },

  
});
