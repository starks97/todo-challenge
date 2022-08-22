import { methodSwitcher } from "../../../app/backend/utils";
import { UserAuth } from "../../../app/backend/auth";
import GenerateJWT from "../../../app/backend/auth/jwt";

export default methodSwitcher({
  POST: async (req, res) => {
    if (!req.body || typeof req.body !== "object") {
      res.statusCode = 400;
      res.send({ message: "Bad Request" });
      return;
    }

    const {
      password = "",
      username = "",
    }: { password: string; username: string } = req.body;

    const user = await UserAuth.login(password, username);
    if (!user) {
      res.statusCode = 404;
      res.send({ message: "invalid credentials" });
      return;
    }

    const { isAdmin, id } = user;

    const token = new GenerateJWT(id, username).generateJWT();
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
