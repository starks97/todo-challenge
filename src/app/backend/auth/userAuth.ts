import PrismaDB from "../../db/conectPrisma";
import { User } from "@prisma/client";

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
    return null;
  }

  static async login<T extends string = string>(
    password: T,
    username: T
  ): Promise<User | null> {
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
    } finally {
      await PrismaDB.disconnect();
    }
    return null;
  }

  static async verifyToken(
    id: string
  ): Promise<Omit<User, "createdAt" | "updatedAt" | "password"> | null> {
    let prisma = await PrismaDB.getInstance();

    try {
      if (id) {
        const data = await prisma.user.findMany({
          where: {
            id: {
              equals: id,
            },
          },
          select: {
            id: true,
            username: true,
            isAdmin: true,
          },
        });
        if (!data) return null;
        const isVerifiedID = data.find((user) => user.id === id);
        if (!isVerifiedID) return null;

        return isVerifiedID;
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}

/*
type GenericNames = "user";


if(data === null || data === undefined || typeof data !== "object") {
  throw new Error("data is not an object");
}

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