import { Request, Response } from "express";
import { UpdateTransactionService } from "../../services/transaction/UpdateTransactionService";

export class UpdateTransactionController {
  async handle(request: Request, response: Response) {
    const { transactionId, name, moduleId } = request.body;
    const updateTransaction = new UpdateTransactionService();

    const transaction = await updateTransaction.execute({
      transactionId,
      name,
      moduleId,
    });

    return response.json(transaction);
  }
}
