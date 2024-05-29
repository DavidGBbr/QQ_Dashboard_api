import { Request, Response } from "express";
import { CreateTransactionService } from "../../services/transaction/CreateTransactionService";

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { moduleId, name } = request.body;
    const createTransactionService = new CreateTransactionService();

    const transaction = await createTransactionService.execute({
      moduleId,
      name,
    });
    return response.json(transaction);
  }
}
