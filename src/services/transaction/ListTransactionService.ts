import prismaClient from "../../prisma";

export class ListTransactionService {
  async execute() {
    const transactions = await prismaClient.moduleTransaction.findMany({
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
  }
}
