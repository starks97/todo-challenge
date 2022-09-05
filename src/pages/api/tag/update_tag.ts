import { methodSwitcher } from "../../../app/backend/utils";

import { Tags } from "../../../app/backend/tags";

import GenerateJWT from "../../../app/backend/auth/jwt";

import { Tag, ToDo } from "@prisma/client";

export default methodSwitcher({
  PUT: async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      res.statusCode = 400;
      res.send({ message: "Bad Request" });
      return;
    }

    const { id = "" } = req.query as { id: string };

    const { title = "", color = "" } = req.body as {
      title: string;
      color: string;
    };

    console.log(req.body);

    const updateTag = await Tags.updateTag(id, { title, color });

    if (!updateTag) {
      return res
        .status(400)
        .send({ code: 400, message: "it can not update a tag" });
    }

    res.status(200).json({ updateTag });
  },
});
