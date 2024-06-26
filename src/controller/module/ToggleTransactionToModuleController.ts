import { Request, Response } from "express";
import { ToggleTransactionToModuleService } from "../../services/module/ToggleTransactionToModuleService";

export class ToggleTransactionToModuleController {
  async handle(request: Request, response: Response) {
    const { module_id, transaction_id } = request.body;
    const service = new ToggleTransactionToModuleService();

    try {
      const result = await service.execute({ module_id, transaction_id });
      return response.json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
