import { methodSwitcher } from "../../../app/backend/utils";

import { TaskTodo } from "../../../app/backend/todo";

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

    const updateTodo = await TaskTodo.updateTodo(id, {
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
});
