import { methodSwitcher } from "../../../app/backend/utils";

import { Tags } from "../../../app/backend/tags";

import GenerateJWT from "../../../app/backend/auth/jwt";
import { Tag, ToDo } from "@prisma/client";

type R =
  | (Tag & {
      ToDo: ToDo;
    })
  | null;

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

type Z = NoUndefinedField<R>;

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
    console.log(decoded);

    const {
      title = "",
      color = "",
      toDoId = "",
    }: {
      title: string;
      color: string;
      toDoId: string;
    } = req.body;

    const createTag: Z = await Tags.createTag({
      userId: decoded,
      toDoId,
      title,
      color,
    });

    if (!createTag) {
      return res
        .status(400)
        .send({ code: 400, message: "it can not create a tag" });
    }

    return res.status(200).json({
      createTag,
    });
  },
});
