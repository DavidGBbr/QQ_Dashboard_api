import prismaClient from "../../prisma";

interface TransactionRequest {
  moduleId: number;
  name: string;
}

export class CreateTransactionService {
  async execute({ moduleId, name }: TransactionRequest) {
    const TransactionAlreadyExists = await prismaClient.transaction.findFirst({
      where: {
        name,
      },
    });

    if (TransactionAlreadyExists) {
      throw new Error("Transaction already exists");
    }

    const Transaction = await prismaClient.transaction.create({
      data: {
        name,
      },
    });

    const ModuleTransaction = await prismaClient.moduleTransaction.create({
      data: {
        moduleId: moduleId,
        transactionId: Transaction?.transactionId,
      },
    });

    return { ModuleTransaction };
  }
}
