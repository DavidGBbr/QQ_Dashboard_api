import prismaClient from "../../prisma";

interface FunctionRequest {
  transactionId: number;
  name: string;
}

export class CreateFunctionService {
  async execute({ transactionId, name }: FunctionRequest) {
    const functionAlreadyExistsInTransaction =
      await prismaClient.transactionFunction.findFirst({
        where: {
          transactionId,
          function: {
            name,
          },
        },
        include: {
          function: true,
        },
      });

    if (functionAlreadyExistsInTransaction) {
      throw new Error("Function already exists in this transaction");
    }

    const _function = await prismaClient.function.create({
      data: {
        name,
      },
    });

    const transactionFunction = await prismaClient.transactionFunction.create({
      data: {
        transactionId: transactionId,
        functionId: _function.functionId,
      },
    });

    return { transactionFunction };
  }
}
