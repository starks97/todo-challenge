import { methodSwitcher } from "../../../app/backend/utils";

import { Tags } from "../../../app/backend/tags";

import GenerateJWT from "../../../app/backend/auth/jwt";
import { Tag, ToDo } from "@prisma/client";

type CreateTagRequest = (Tag & {}) | null;

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

type WithOutUndefined = NoUndefinedField<CreateTagRequest>;

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
      color = "",
    }: {
      title: string;
      color: string;
    } = req.body;

    const tag: WithOutUndefined = await Tags.createTag({
      userId: decoded,
      title,
      color,
    });

    if (!tag) {
      return res
        .status(400)
        .send({ code: 400, message: "it can not create a tag" });
    }

    return res.status(200).json({
      tag,
    });
  },

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
