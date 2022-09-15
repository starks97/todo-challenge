import { PrismaDB } from "../../db";
import { Check, Prisma } from "@prisma/client";

export default class Tasks {
  static async createTasks({ todoId, userId, ...checks }: Omit<Check, "id">) {
    const prisma = await PrismaDB.getInstance();

    try {
      if (checks) {
        const data = await prisma.check.create({
          data: {
            ...checks,
            Todo: { connect: { id: todoId } },
            User: { connect: { id: userId } },
          },
          include: {
            Todo: false,
            User: false,
          },
        });

        if (!data) return null;

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

  static async deleteTasks(id: string) {
    const prisma = await PrismaDB.getInstance();

    try {
      const data = await prisma.check.delete({
        where: { id },
      });

      if (!data) return null;

      return data;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }

  static async updateTasks(
    id: string,
    data: Omit<Check, "id" | "userId" | "todoId">
  ) {
    const prisma = await PrismaDB.getInstance();

    try {
      const oldCheck = await prisma.check.findUnique({
        where: { id },
      });

      if (!oldCheck) return null;

      const newCheck = await prisma.check.update({
        where: { id },
        data: {
          title: data.title || oldCheck.title,
          completed: data.completed || oldCheck.completed,
        },
      });

      if (!newCheck) return null;

      return newCheck;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }

  static async getTasks(todoId: string) {
    const prisma = await PrismaDB.getInstance();

    try {
      if (todoId) {
        const data = await prisma.check.findMany({
          where: {
            todoId: { equals: todoId },
          },

          select: {
            title: true,
            completed: true,
          },
        });

        if (!data) return null;

        return data;
      }
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }
}
