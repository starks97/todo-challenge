import { methodSwitcher } from "../../../app/backend/utils";

import { Tags } from "../../../app/backend/tags";

import { Tag, ToDo } from "@prisma/client";

export default methodSwitcher({
  DELETE: (req, res) => {
    const { id = "6316108acc50eaf4b8604ab1" } = req.query;
    const tag = Tags.deleteTag(`${id}`);
    if (!tag) {
      res.statusCode = 404;
      res.send({ message: "there are not any tags to process" });
      return;
    }

    return res.status(200).json({
      message: "the tag was successfully deleted",
    });
  },
});
