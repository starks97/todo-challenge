import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not set");
  process.exit(1);
}

export default class GenerateJWT {
  constructor(public id: string, public username: string) {
    id = this.id;
    username = this.username;
  }

  public generateJWT(): string {
    return jwt.sign(
      { id: this.id, username: this.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );
  }

  static decoded(token: string): jwt.JwtPayload | null {
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET as string);

      if (!verified) return null;

      const payload = jwt.decode(token, {
        complete: false,
        json: true,
      });

      if (!payload) return null;

      if (typeof payload === "string") return null;

      return payload;
    } catch {
      return null;
    }
  }
}
