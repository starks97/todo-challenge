import { Prisma, Tag } from "@prisma/client";
import PrismaDB from "../../db/conectPrisma";

export default class Tags {
  static async createTag({ userId, ...tag }: Omit<Tag, "id" | "toDoId">) {
    const prisma = await PrismaDB.getInstance();
    try {
      if (tag) {
        const dataTag = await prisma.tag.create({
          data: {
            ...tag,
            User: { connect: { id: userId } },
          },
          include: {
            User: false,
          },
        });

        return dataTag;
      }
      if (!tag) return null;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this email"
          );
        }
      }
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
    return null;
  }

  static async updateTag(
    id: string,
    data: Omit<Tag, "id" | "userId" | "toDoId">
  ) {
    const prisma = await PrismaDB.getInstance();
    try {
      const oldTag = prisma.tag.findUnique({
        where: { id },
      }) as unknown as Tag;
      if (!oldTag) return null;

      const newDataTag = await prisma.tag.update({
        where: { id },
        data: {
          title: data.title || oldTag.title,
          color: data.color || oldTag.color,
        },
      });
      if (!newDataTag) return null;
      return newDataTag;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }

  static async deleteTag(id: string) {
    const prisma = await PrismaDB.getInstance();
    try {
      const data = await prisma.tag.delete({
        where: { id },
      });
      return data;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }

  static async getTag(userId: string) {
    const prisma = await PrismaDB.getInstance();

    try {
      if (userId) {
        const data = await prisma.tag.findMany({
          where: {
            userId: { equals: userId },
          },
          select: {
            id: true,
            title: true,
            color: true,
            userId: true,
          },
        });

        if (!data) return null;

        return data;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }
}
