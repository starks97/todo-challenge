import { methodSwitcher } from "../../../app/backend/utils";
import { UserAuth } from "../../../app/backend/auth";
import GenerateJWT from "../../../app/backend/auth/jwt";


export default methodSwitcher({
    PUT: async (req, res) => {

        try{
            if (!req.body || typeof req.body !== "object") {
              res.statusCode = 400;
              res.send({ message: "Bad Request" });
              return;
            }

            const token  = req.cookies.token;
            if (!token) {
              res.statusCode = 404;
              res.send({ message: "Error auth" });
              return;
            }

            const { password = "" } = req.body as { password: string };

            const decoded = GenerateJWT.decoded(token);

            if(!decoded) {
                res.statusCode = 404;
                res.send({ message: "Error with token" });
                return
            }

            const user = await UserAuth.UpdatePassword(await decoded, {password});

            if(!user) {
              res.statusCode = 404;
              res.send({ message: "Not found credentials" });
              return;
            }

            res.status(200).json({message: "Password updated successfully"});


        }catch(err){
            console.error(err);
            
        }

    }
})