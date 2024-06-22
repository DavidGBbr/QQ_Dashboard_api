import prismaClient from "../../prisma";

interface TransactionRequest {
  functionId: number;
  name: string;
  transactionId: number;
}

export class UpdateFunctionService {
  async execute({ functionId, name, transactionId }: TransactionRequest) {
    try {
      const functionAlreadyExists = await prismaClient.function.findFirst({
        where: {
          functionId: functionId,
        },
      });

      if (!functionAlreadyExists) {
        throw new Error("Function does not exist!");
      }

      const functionUpdated = await prismaClient.function.update({
        where: {
          functionId: functionId,
        },
        data: {
          name,
        },
        select: {
          functionId: true,
          name: true,
        },
      });

      const functionTransactionUpdated =
        await prismaClient.transactionFunction.upsert({
          where: {
            transactionId_functionId: {
              transactionId: transactionId,
              functionId: functionId,
            },
          },
          update: {
            transactionId: transactionId,
          },
          create: {
            functionId: functionId,
            transactionId: transactionId,
          },
          select: {
            functionId: true,
            transactionId: true,
          },
        });

      return {
        function: functionUpdated,
        functionTransaction: functionTransactionUpdated,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error updating the function!");
    }
  }
}
