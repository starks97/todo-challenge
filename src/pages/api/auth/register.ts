import { methodSwitcher } from "../../../components/utils";
import { UserAuth } from "../../../app/backend/auth";

export default methodSwitcher({
  POST: async (req, res) => {
    const registerUser = await UserAuth.register(req.body);

    if (registerUser) {
      return res.status(200).json({
        statusCode: 200,
        message: "OK",
      });
    }

    return res.status(400).json({ message: "bad request" });
  },
});
