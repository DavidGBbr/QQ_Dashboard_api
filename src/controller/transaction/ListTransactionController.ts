import { Request, Response } from "express";
import { ListTransactionService } from "../../services/transaction/ListTransactionService";

export class ListTransactionController {
  async handle(request: Request, response: Response) {
    const listTransactionService = new ListTransactionService();

    const transactions = await listTransactionService.execute();
    return response.json(transactions);
  }
}
