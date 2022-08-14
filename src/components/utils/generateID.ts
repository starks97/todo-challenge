import * as crypto from "crypto";

function generateId(): string {
  const random: IDGenerator = Math.random().toString(32).substring(2);
  const date: IDGenerator = Date.now().toString(32);
  return random + date;
}

export default generateId;
type IDGenerator = string | number;

export async function setHashPassword(password: string): Promise<string> {
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("base64");
  return hashedPassword;
}
