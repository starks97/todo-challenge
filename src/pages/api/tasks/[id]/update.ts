import { methodSwitcher } from "../../../../app/backend/utils";

import GenerateJWT from "../../../../app/backend/auth/jwt";

import { Tasks } from "../../../../app/backend/tasks";

export default methodSwitcher({
  PUT: async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      res.statusCode = 400;
      res.send({ message: "Bad Request" });
      return;
    }

    const { id = "" } = req.query as { id: string };

    if (!id) {
      return res.status(401).send({ code: 401, message: "Unauthorized" });
    }

    const { completed = false }: { completed: boolean } = req.body;

    const updateTask = await Tasks.updateTasks(id, { completed });

    if (!updateTask) {
      return res
        .status(400)
        .send({ code: 400, message: "it can not update the task" });
    }

    res.status(200).json({ updateTask });
  },
});
