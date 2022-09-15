import { methodSwitcher } from "../../../../app/backend/utils";

import { Tasks } from "../../../../app/backend/tasks";

export default methodSwitcher({
  DELETE: async (req, res) => {
    const { id = "" } = req.query as { id: string };

    if (!id) {
      return res.status(401).send({ code: 401, message: "Unauthorized" });
    }

    const data = await Tasks.deleteTasks(id);

    if (!data) {
      res.status(400).send({ message: "Theres not any tasks to delete" });
    }

    res.status(200).json({ message: "The task it has been deleted" });
  },
});
