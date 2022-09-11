import { methodSwitcher } from "../../../app/backend/utils";

import { Tags } from "../../../app/backend/tags";

import GenerateJWT from "../../../app/backend/auth/jwt";
import { Tag, ToDo } from "@prisma/client";

export default methodSwitcher({
  GET: async (req, res) => {
    if (typeof req.cookies.token !== "string") {
      return res.status(400).send({ code: 400, message: "Bad Request" });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ code: 400, message: "Unauthorized" });
    }

    const decoded = await GenerateJWT.decoded(token);

    const tags = await Tags.getTag(decoded);

    if (!tags) {
      res.statusCode = 404;
      res.send({ message: "there are not any tags to process" });
      return;
    }

    res.status(200).json({ tags });
  },
});
