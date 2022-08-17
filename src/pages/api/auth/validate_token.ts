import { methodSwitcher } from "../../../app/backend/utils";
import { UserAuth } from "../../../app/backend/auth";
import GenerateJWT from "../../../app/backend/auth/jwt";

export default methodSwitcher({
  GET: async (req, res) => {
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
      if (!token) {
        res.statusCode = 404;
        res.send({ message: "invalid token" });
        return;
      }

      return res.status(200).json({
        statusCode: 200,
        message: "OK",
        token: new_token,
        user: {
          id,
          username,
          isAdmin,
        },
      });
    } catch (err) {
      return res.status(401).send({ code: 401, message: "Unauthorized" });
    }
  },
});
