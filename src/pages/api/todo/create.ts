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
});
