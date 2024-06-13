import { Request, Response } from "express";
import { UpdateTransactionService } from "../../services/transaction/UpdateTransactionService";

export class UpdateTransactionController {
  async handle(request: Request, response: Response) {
    const { transactionId, name, moduleId } = request.body;
    const updateUser = new UpdateTransactionService();

    const user = await updateUser.execute({ transactionId, name, moduleId });

    return response.json(user);
  }
}
