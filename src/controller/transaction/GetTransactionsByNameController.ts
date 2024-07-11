import { Request, Response } from "express";
import { GetTransactionsByNameService } from "../../services/transaction/GetTransactionsByNameService";

export class GetTransactionsByNameController {
  async handle(request: Request, response: Response) {
    const { name } = request.query;
    const getTransactionsService = new GetTransactionsByNameService();

    try {
      const transactions = await getTransactionsService.execute({
        name: String(name),
      });
      return response.json(transactions);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
