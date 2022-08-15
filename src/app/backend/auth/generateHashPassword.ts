import * as crypto from "crypto";

export default class GenerateCryptPassword {
  static async setHashPassword(password: string): Promise<string> {
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("base64");
    return hashedPassword;
  }

  static async compareHashPassword(password: string, userPassword: string) {
    const hashedPassword = await GenerateCryptPassword.setHashPassword(
      password
    );

    return hashedPassword === userPassword;
  }
}
