import { methodSwitcher } from "../../../app/backend/utils";

export default methodSwitcher({
  POST: async (req, res) => {
    if (req.cookies.token) {
      res.setHeader(
        "Set-Cookie",
        "token=NONE; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict"
      );
    }

    res.status(200).send({
      statusCode: 200,
      message: "OK",
    });
  },
});
