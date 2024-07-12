import prismaClient from "../../prisma";

interface FunctionRequest {
  name: string;
}

export class GetFunctionsByNameService {
  async execute({ name }: FunctionRequest) {
    try {
      const functions = await prismaClient.transactionFunction.findMany({
        where: {
          function: {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
        },
        include: {
          transaction: true,
          function: true,
        },
        orderBy: {
          transactionId: "asc",
        },
      });

      const formattedFunctions = functions.map((_function) => ({
        transactionId: _function.transactionId,
        transactionName: _function.transaction.name,
        functionId: _function.functionId,
        functionName: _function.function.name,
      }));

      return formattedFunctions;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
