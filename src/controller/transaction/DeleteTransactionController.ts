import { Request, Response } from "express";
import { DeleteTransactionService } from "../../services/transaction/DeleteTransactionService";

export class DeleteTransactionController {
  async handle(request: Request, response: Response) {
    const transaction_id = Number(request.params.transaction_id);
    const deleteTransactionService = new DeleteTransactionService();

    try {
      const transaction = await deleteTransactionService.execute({
        transaction_id: Number(transaction_id),
      });
      return response.json({
        message: "Transaction deleted successfully",
        transaction,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
