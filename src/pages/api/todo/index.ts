import { methodSwitcher } from "../../../app/backend/utils";

import { TaskTodo } from "../../../app/backend/todo";

import GenerateJWT from "../../../app/backend/auth/jwt";

export default methodSwitcher({
  POST: async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      res.statusCode = 400;
      res.send({ message: "Bad Request" });
      return;
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ code: 401, message: "Unauthorized" });
    }

    const decoded = await GenerateJWT.decoded(token);

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

    const task = await TaskTodo.createTodo({
      title,
      description,
      completed,
      color,
      userId: decoded,
      tagIds: [],
    });

    if (!task) {
      res.statusCode = 404;
      res.send({ message: "invalid credentials" });
      return;
    }

    return res.status(200).json({
      task,
    });
  },

  GET: async (req, res) => {
    if (typeof req.cookies.token !== "string") {
      return res.status(400).send({ code: 400, message: "Bad Request" });
    }

    const token = req.cookies.token;

    const decoded = await GenerateJWT.decoded(token);

    const todos = await TaskTodo.getTodo(decoded);

    if (!todos) {
      res.statusCode = 404;
      res.send({ message: "there are not any todos to process" });
      return;
    }

    return res.status(200).json({
      todos,
    });
  },
});
