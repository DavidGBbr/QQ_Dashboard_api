import prismaClient from "../../prisma";

interface TransactionRequest {
  moduleId: number;
  name: string;
}

export class CreateTransactionService {
  async execute({ moduleId, name }: TransactionRequest) {
    const transactionAlreadyExistsInModule =
      await prismaClient.moduleTransaction.findFirst({
        where: {
          moduleId,
          transaction: {
            name,
          },
        },
        include: {
          transaction: true,
        },
      });

    if (transactionAlreadyExistsInModule) {
      throw new Error("Transaction already exists in this module");
    }

    const transaction = await prismaClient.transaction.create({
      data: {
        name,
      },
    });

    const moduleTransaction = await prismaClient.moduleTransaction.create({
      data: {
        moduleId: moduleId,
        transactionId: transaction.transactionId,
      },
    });

    return { moduleTransaction };
  }
}
