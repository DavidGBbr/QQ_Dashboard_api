import { Request, Response } from "express";
import { DeleteFunctionService } from "../../services/function/DeleteFunctionService";

export class DeleteFunctionController {
  async handle(request: Request, response: Response) {
    const function_id = Number(request.params.function_id);
    const deleteFunctionService = new DeleteFunctionService();

    try {
      const _function = await deleteFunctionService.execute({
        function_id: Number(function_id),
      });
      return response.json({
        message: "Function deleted successfully",
        _function,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
