import { Prisma, ToDo } from "@prisma/client";
import PrismaDB from "../../db/conectPrisma";

export default class TaskTodo {
  static async createTodo({
    userId,
    ...task
  }: Omit<ToDo, "id" | "createdAt" | "updatedAt">) {
    const prisma = await PrismaDB.getInstance();
    try {
      if (task) {
        const data = await prisma.toDo.create({
          data: {
            ...task,
            User: { connect: { id: userId } },
          },

          include: {
            User: false,
          },
        });
        return data;
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
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

  static async getTodo(userId: string) {
    const prisma = await PrismaDB.getInstance();
    try {
      if (userId) {
        const data = await prisma.toDo.findMany({
          where: {
            userId: { equals: userId },
          },
          select: {
            id: true,
            title: true,
            description: true,
            color: true,
            userId: true,
          },
        });

        if (!data) return null;

        return data;
      }
      return null;
    } catch (e) {
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
    return null;
  }

  static async getTodos() {
    const prisma = await PrismaDB.getInstance();
    try {
      const data = await prisma.toDo.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          color: true,
          userId: true,
        },
      });

      return data;
    } catch (e) {
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
    return null;
  }

  static async deleteTodo(id: string) {
    const prisma = await PrismaDB.getInstance();
    try {
      const data = await prisma.toDo.delete({
        where: { id },
      });

      if (!data) return null;

      return data;

      return null;
    } catch (e) {
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
    return null;
  }
}
