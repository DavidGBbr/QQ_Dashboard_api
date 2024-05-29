import prismaClient from "../../prisma";

export class ListTransactionService {
  async execute() {
    const modules = await prismaClient.module.findMany({
      orderBy: {
        moduleId: "asc",
      },
    });
    return modules;
  }
}
