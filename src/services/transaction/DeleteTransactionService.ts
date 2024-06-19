import prismaClient from "../../prisma";

interface TransactionRequest {
  transaction_id: number;
}

export class DeleteTransactionService {
  async execute({ transaction_id }: TransactionRequest) {
    const transactionExists = await prismaClient.transaction.findUnique({
      where: {
        transactionId: transaction_id,
      },
    });

    if (!transactionExists) {
      throw new Error("Transaction not found");
    }

    const transaction = await prismaClient.$transaction(async (prisma) => {
      await prisma.transactionFunction.deleteMany({
        where: {
          transactionId: transaction_id,
        },
      });

      await prisma.moduleTransaction.deleteMany({
        where: {
          transactionId: transaction_id,
        },
      });

      return prisma.transaction.delete({
        where: {
          transactionId: transaction_id,
        },
      });
    });

    return transaction;
  }
}
