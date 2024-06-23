import prismaClient from "../../prisma";

interface TransactionRequest {
  function_id: number;
}

export class GetFunctionService {
  async execute({ function_id }: TransactionRequest) {
    try {
      const response = await prismaClient.function.findFirst({
        where: {
          functionId: function_id,
        },
        select: {
          functionId: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          transactionFunction: {
            select: {
              transaction: {
                select: {
                  transactionId: true,
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
