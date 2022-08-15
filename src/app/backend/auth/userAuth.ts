import PrismaDB from "../../db/conectPrisma";
import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import GenerateCryptPassword from "./generateHashPassword";

export class UserAuth {
  static async register(
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<User | null> {
    const prisma = await PrismaDB.getInstance();
    //hashed password
    user.password = await GenerateCryptPassword.setHashPassword(user.password);

    try {
      const data = await prisma.user.create({
        data: user,
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }

  static async login<T extends string = string>(
    password: T,
    username: T
  ): Promise<User | null | undefined> {
    let prisma = await PrismaDB.getInstance();

    try {
      if (password) {
        const data = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });
        if (!data) return null;

        const isVerifiedPassword =
          await GenerateCryptPassword.compareHashPassword(
            password,
            data.password
          );
        if (!isVerifiedPassword) return null;
        return data;
      }
    } catch (err) {
      console.error(err);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }
}

/*
type GenericNames = "user";

class GenericModel<T extends User = User> {
  constructor(private prisma: PrismaClient, private name: GenericNames) {}

  async register(dat: T): Promise<T> {
    const prisma = this.prisma;
    try {
      const data = await prisma[this.name].create({
        data: dat,
      });
      return data;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      await PrismaDB.disconnect();
    }
  }
}

const userModel = async () => {
  const createuser = new GenericModel<User>(
    await PrismaDB.getInstance(),
    "user"
  );
};*/
