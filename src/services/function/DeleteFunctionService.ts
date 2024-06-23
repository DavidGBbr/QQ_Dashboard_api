import prismaClient from "../../prisma";

interface FunctionRequest {
  function_id: number;
}

export class DeleteFunctionService {
  async execute({ function_id }: FunctionRequest) {
    const functionExists = await prismaClient.function.findUnique({
      where: {
        functionId: function_id,
      },
    });

    if (!functionExists) {
      throw new Error("Function not found");
    }

    const _function = await prismaClient.$transaction(async (prisma) => {
      await prisma.transactionFunction.deleteMany({
        where: {
          functionId: function_id,
        },
      });

      return prisma.function.delete({
        where: {
          functionId: function_id,
        },
      });
    });

    return _function;
  }
}
