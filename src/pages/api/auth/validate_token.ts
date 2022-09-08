import { methodSwitcher } from "../../../app/backend/utils";
import { UserAuth } from "../../../app/backend/auth";
import GenerateJWT from "../../../app/backend/auth/jwt";
import { NextApiResponse } from "next";

type Data =
  | { message: string }
  | {
      token: string;
      auth: {
        id: string;
        username: string;
        isAdmin: boolean;
      };
    };

export default methodSwitcher({
  GET: async (req, res: NextApiResponse<Data>) => {
    const { token = "" } = req.cookies;
    if (!token) {
      res.statusCode = 404;
      res.send({ message: "Error auth" });
      return;
    }
    try {
      const decoded = GenerateJWT.decoded(token);
      const user = await UserAuth.verifyToken(await decoded);

      if (!user) {
        res.statusCode = 404;
        res.send({ message: "there is not user with that id" });
        return;
      }
      const { isAdmin, id, username } = user;

      const new_token = new GenerateJWT(
        await decoded,
        user.username
      ).generateJWT();

      if (!new_token) {
        res.statusCode = 404;
        res.send({ message: "invalid token" });
        return;
      }

      return res.status(200).json({
        token: new_token,
        auth: {
          id,
          username,
          isAdmin,
        },
      });
    } catch (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
  },
});
