import prismaClient from "../../prisma";

export class ListFunctionService {
  async execute() {
    const functions = await prismaClient.transactionFunction.findMany({
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
  }
}
