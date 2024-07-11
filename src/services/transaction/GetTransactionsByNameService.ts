import prismaClient from "../../prisma";

interface TransactionRequest {
  name: string;
}

export class GetTransactionsByNameService {
  async execute({ name }: TransactionRequest) {
    try {
      const transactions = await prismaClient.moduleTransaction.findMany({
        where: {
          transaction: {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
        },
        include: {
          module: true,
          transaction: true,
        },
        orderBy: {
          moduleId: "asc",
        },
      });

      const formattedTransactions = transactions.map((transaction) => ({
        moduleId: transaction.moduleId,
        moduleName: transaction.module.name,
        transactionId: transaction.transactionId,
        transactionName: transaction.transaction.name,
      }));

      return formattedTransactions;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
