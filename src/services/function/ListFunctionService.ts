import prismaClient from "../../prisma";

export class ListFunctionService {
  async execute() {
    const functions = await prismaClient.function.findMany({
      orderBy: {
        functionId: "asc",
      },
    });
    return functions;
  }
}
