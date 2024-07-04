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

      const existingRelation = await prismaClient.transactionFunction.findFirst(
        {
          where: {
            functionId: functionId,
            transactionId: transactionId,
          },
          include: {
            function: true,
          },
        }
      );

      if (existingRelation && existingRelation.function.name === name) {
        throw new Error(
          "Function with the same ID/Name is already related to this transaction!"
        );
      }

      // Atualizar a função
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
      if (
        error.message ===
        "Function with the same ID/Name is already related to this transaction!"
      ) {
        throw error;
      }
      console.error(error);
      throw new Error("Error updating the function!");
    }
  }
}
