import { Request, Response } from "express";
import { CreateFunctionService } from "../../services/function/CreateFunctionService";

export class CreateFunctionController {
  async handle(request: Request, response: Response) {
    const { transactionId, name } = request.body;
    const createFunctionService = new CreateFunctionService();

    const _function = await createFunctionService.execute({
      transactionId,
      name,
    });
    return response.json(_function);
  }
}
