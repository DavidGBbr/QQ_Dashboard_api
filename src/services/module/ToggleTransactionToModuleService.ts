import prismaClient from "../../prisma";

interface ToggleTransactionRequest {
  module_id: number;
  transaction_id: number;
}

export class ToggleTransactionToModuleService {
  async execute({ module_id, transaction_id }: ToggleTransactionRequest) {
    try {
      const moduleExists = await prismaClient.module.findFirst({
        where: { moduleId: module_id },
      });

      if (!moduleExists) {
        throw new Error("Module does not exist!");
      }

      const transactionExists = await prismaClient.transaction.findFirst({
        where: { transactionId: transaction_id },
      });

      if (!transactionExists) {
        throw new Error("Transaction does not exist!");
      }

      const existingRelation = await prismaClient.moduleTransaction.findUnique({
        where: {
          moduleId_transactionId: {
            moduleId: module_id,
            transactionId: transaction_id,
          },
        },
      });

      if (existingRelation) {
        await prismaClient.moduleTransaction.delete({
          where: {
            moduleId_transactionId: {
              moduleId: module_id,
              transactionId: transaction_id,
            },
          },
        });
        return { message: "Transaction disassociated from module." };
      } else {
        await prismaClient.moduleTransaction.create({
          data: {
            moduleId: module_id,
            transactionId: transaction_id,
          },
        });
        return { message: "Transaction associated to module." };
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error toggling transaction association to module!");
    }
  }
}
