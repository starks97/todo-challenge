import { Prisma, ToDo } from "@prisma/client";
import PrismaDB from "../../db/conectPrisma";

export default class Todos {
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
            tagIds: true,
            tasks: true,
            completed: true,
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

  static async updateTodo(
    id: string,
    data: Omit<ToDo, "createdAt" | "updatedAt" | "id" | "userId" | "tagIds">
  ) {
    const prisma = await PrismaDB.getInstance();
    try {
      const oldTodo = await prisma.toDo.findUnique({
        where: { id },
      });
      if (!oldTodo) return null;

      const newTodoData = await prisma.toDo.update({
        where: { id },
        data: {
          title: data.title || oldTodo.title,
          description: data.description || oldTodo.description,
          color: data.color || oldTodo.color,
          completed: data.completed || oldTodo.completed,
        },
      });

      if (!newTodoData) return null;

      return newTodoData;
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }

  static async setTags(id: string, tagIds: string[]) {
    const prisma = await PrismaDB.getInstance();

    try {
      const newTodoData = await prisma.toDo.update({
        where: { id },
        data: {
          tagIds: {
            set: [...tagIds],
          },
        },
      });

      if (!newTodoData) return null;

      return newTodoData;
    } catch (e) {
      return null;
    } finally {
      await PrismaDB.disconnect();
    }
  }
}
