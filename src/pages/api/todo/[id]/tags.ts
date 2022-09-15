import { methodSwitcher } from "../../../../app/backend/utils";

import { TaskTodo } from "../../../../app/backend/todo";
import { NextApiRequest } from "next";

export default methodSwitcher({
  PUT: async (req, res) => {
    if (!req.body) {
      res.status(400).json({ message: "Bad request into your database" });
      return;
    }

    const { id = "" } = req.query as { id: string };

    const { tagIds } = req.body as { tagIds: string[] };

    const data = await TaskTodo.setTags(id, tagIds);

    if (!data) {
      res.status(400).json({ message: "Bad request into your database" });
      return;
    }

    res.status(200).json({ data });
  },
});
