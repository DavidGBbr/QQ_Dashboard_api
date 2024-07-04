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

      const existingRelation = await prismaClient.moduleTransaction.findFirst({
        where: {
          transactionId: transactionId,
          moduleId: moduleId,
        },
        include: {
          transaction: true,
        },
      });

      if (existingRelation && existingRelation.transaction.name === name) {
        throw new Error(
          "Transaction with the same ID/Name is already related to this module!"
        );
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
      if (
        error.message ===
        "Transaction with the same ID/Name is already related to this module!"
      ) {
        throw error;
      }
      console.error(error);
      throw new Error("Error updating the transaction!");
    }
  }
}
