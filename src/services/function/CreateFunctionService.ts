import prismaClient from "../../prisma";

interface FunctionRequest {
  transactionId: number;
  name: string;
}

export class CreateFunctionService {
  async execute({ transactionId, name }: FunctionRequest) {
    const FunctionAlreadyExists = await prismaClient.function.findFirst({
      where: {
        name,
      },
    });

    if (FunctionAlreadyExists) {
      throw new Error("Function already exists");
    }

    const Function = await prismaClient.function.create({
      data: {
        name,
      },
    });

    const TransactionFunction = await prismaClient.transactionFunction.create({
      data: {
        transactionId: transactionId,
        functionId: Function?.functionId,
      },
    });

    return { TransactionFunction };
  }
}
