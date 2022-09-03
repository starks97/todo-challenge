import { methodSwitcher } from "../../../app/backend/utils";

import { TaskTodo } from "../../../app/backend/todo";

import GenerateJWT from "../../../app/backend/auth/jwt";

export default methodSwitcher({
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
