import prismaClient from "../../prisma";

interface TransactionRequest {
  transactionId: number;
  name: string;
  moduleId: number;
}

export class UpdateTransactionService {
  async execute({ transactionId, name, moduleId }: TransactionRequest) {
    try {
      const transactionAlreadyExists = await prismaClient.transaction.findFirst(
        {
          where: {
            transactionId: transactionId,
          },
        }
      );

      if (!transactionAlreadyExists) {
        throw new Error("Transaction does not exist!");
      }

      const transactionUpdated = await prismaClient.transaction.update({
        where: {
          transactionId: transactionId,
        },
        data: {
          name,
        },
        select: {
          transactionId: true,
          name: true,
        },
      });

      const transactionModuleUpdated =
        await prismaClient.moduleTransaction.upsert({
          where: {
            moduleId_transactionId: {
              transactionId: transactionId,
              moduleId: moduleId,
            },
          },
          update: {
            moduleId: moduleId,
          },
          create: {
            transactionId: transactionId,
            moduleId: moduleId,
          },
          select: {
            transactionId: true,
            moduleId: true,
          },
        });

      return {
        transaction: transactionUpdated,
        transactionModule: transactionModuleUpdated,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error updating the transaction!");
    }
  }
}
