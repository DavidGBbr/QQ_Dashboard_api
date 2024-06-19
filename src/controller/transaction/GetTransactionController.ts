import { Request, Response } from "express";
import { GetTransactionService } from "../../services/transaction/GetTransactionService";

export class GetTransactionController {
  async handle(request: Request, response: Response) {
    const transaction_id = Number(request.params.transaction_id);
    const getTransactionService = new GetTransactionService();

    const transaction = await getTransactionService.execute({ transaction_id });
    return response.json(transaction);
  }
}
