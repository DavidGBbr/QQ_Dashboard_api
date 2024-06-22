import { Request, Response } from "express";
import { UpdateFunctionService } from "../../services/function/UpdateFunctionService";

export class UpdateFunctionController {
  async handle(request: Request, response: Response) {
    const { functionId, name, transactionId } = request.body;
    const updateFunction = new UpdateFunctionService();

    const _function = await updateFunction.execute({
      functionId,
      name,
      transactionId,
    });

    return response.json(_function);
  }
}
