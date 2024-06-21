import prismaClient from "../../prisma";

interface TransactionRequest {
  transaction_id: number;
}

export class GetTransactionService {
  async execute({ transaction_id }: TransactionRequest) {
    try {
      const response = await prismaClient.transaction.findFirst({
        where: {
          transactionId: transaction_id,
        },
        select: {
          transactionId: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          moduleTransaction: {
            select: {
              module: {
                select: {
                  moduleId: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
