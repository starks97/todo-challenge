import { PrismaDB } from "../../db";
import { Task, Prisma } from "@prisma/client";

export default class Tasks {
  static async createTasks({ todoId, userId, ...checks }: Omit<Task, "id">) {
    const prisma = await PrismaDB.getInstance();

    try {
      if (checks) {
        const data = await prisma.task.create({
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
      const data = await prisma.task.delete({
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
    data: Omit<Task, "id" | "userId" | "todoId" | "title">
  ) {
    const prisma = await PrismaDB.getInstance();

    try {
      const oldCheck = await prisma.task.findUnique({
        where: { id },
      });

      if (!oldCheck) return null;

      const newCheck = await prisma.task.update({
        where: { id },
        data: {
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
        const data = await prisma.task.findMany({
          where: {
            todoId: { equals: todoId },
          },

          select: {
            title: true,
            completed: true,
            id: true,
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
