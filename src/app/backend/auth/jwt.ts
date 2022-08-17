import jwt, { JwtPayload } from "jsonwebtoken";

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

  static decoded(token: string): Promise<string>{
    return new Promise((resolve, reject) => {
      try {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
          if (err) reject(err);

          const { id } = payload as { id: string };

          resolve(id);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
}

/*try {
      const verified = jwt.verify(token, process.env.JWT_SECRET as string);
  
      if (!verified) return null;
  
      const payload = jwt.decode(token, {
        complete: false,
        json: true,
      });
  
      if (!payload) return null;
  
      if (typeof payload === 'string') return null;
  
      return payload as JwtPayload;
    } catch {
      return null;
    } */
