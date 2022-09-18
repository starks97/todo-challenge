import { methodSwitcher } from "../../../../app/backend/utils";

import GenerateJWT from "../../../../app/backend/auth/jwt";

import { Tasks } from "../../../../app/backend/tasks";
import { Check, ToDo } from "@prisma/client";

type CreateTaskRequest = (Check & {}) | null;

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

type WithOutUndefined = NoUndefinedField<CreateTaskRequest>;

export default methodSwitcher({
  POST: async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      res.statusCode = 400;
      res.send({ message: "Bad Request" });
      return;
    }

    const token = req.cookies.token as string;

    if (!token) {
      return res.status(401).send({ code: 401, message: "Unauthorized" });
    }

    const decoded = await GenerateJWT.decoded(token);

    const { id = "" } = req.query as { id: string };

    if (!id) {
      return res
        .status(401)
        .send({ code: 401, message: "Unauthorized todoId" });
    }

    const {
      title = "",
      completed = false,
    }: {
      title: string;
      completed: boolean;
    } = req.body;

    const createTasks: WithOutUndefined = await Tasks.createTasks({
      todoId: id,
      userId: decoded,
      title,
      completed,
    });

    if (!createTasks) {
      return res.status(401).send({ message: "The tasks can not be created" });
    }

    res.status(200).json({ createTasks });
  },

  GET: async (req, res) => {
    const { id = "" } = req.query as { id: string };

    if (!id) {
      return res
        .status(401)
        .send({ code: 401, message: "Unauthorized todoId" });
    }

    const getTask = await Tasks.getTasks(id);

    if (!getTask) {
      return res.status(401).send({ message: "Theres not task found" });
    }

    res.status(200).json({ getTask });
  },
});
