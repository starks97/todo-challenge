import { methodSwitcher } from "../../../app/backend/utils";
import { UserAuth } from "../../../app/backend/auth";
import GenerateJWT from "../../../app/backend/auth/jwt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const KEY = "sadasasdsadassd";

export default methodSwitcher({
  POST: async (req, res) => {
    if (!req.body) {
      res.statusCode = 404;
      res.send({ message: "invalid auth credentials" });
      return;
    }

    const {
      password = "",
      username = "",
    }: { password: string; username: string } = req.body;

    const user = (await UserAuth.login(password, username)) as unknown as User;
    if (!user) {
      res.statusCode = 404;
      res.send({ message: "invalid auth username" });
      return;
    }

    const { isAdmin, id } = user;

    const token = new GenerateJWT(id, username).generateJWT();
    if (!token) {
      res.statusCode = 404;
      res.send({ message: "invalid token" });
      return;
    }

    return res.status(200).json({
      statusCode: 200,
      message: "OK",
      token,
      user: {
        username,
        isAdmin,
      },
    });
  },
});
