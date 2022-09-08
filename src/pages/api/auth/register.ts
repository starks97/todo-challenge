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
  POST: async (req, res: NextApiResponse<Data>) => {
    try {
      if (!req.body || typeof req.body !== "object") {
        return res.status(404).json({ message: "bad request" });
      }

      const {
        username = "",
        password = "",
      }: { username: string; password: string } = req.body;

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      const registerUser = await UserAuth.register(req.body);

      if (!registerUser) {
        return res.status(401).json({ message: "user already exists" });
      }

      const token = new GenerateJWT(registerUser.id, username).generateJWT();
      if (!token) {
        res.statusCode = 401;
        res.send({ message: "invalid token" });
        return;
      }

      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toString();

      //set token in cookie
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; HttpOnly; Expires=${expires}; SameSite=Strict`
      );

      const { id, isAdmin } = registerUser;

      return res.status(200).json({ token, auth: { id, username, isAdmin } });
    } catch (e) {
      console.log(e);
    }
  },
});
