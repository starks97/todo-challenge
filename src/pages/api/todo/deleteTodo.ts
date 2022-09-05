import { methodSwitcher } from "../../../app/backend/utils";

import { TaskTodo } from "../../../app/backend/todo";

export default methodSwitcher({
  DELETE: (req, res) => {
    const { id = "" } = req.query as { id: string };
    const todo = TaskTodo.deleteTodo(`${id}`);
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
