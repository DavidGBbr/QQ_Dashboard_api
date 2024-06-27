import { Request, Response } from "express";
import { DeleteModuleService } from "../../services/module/DeleteModuleService";

export class DeleteModuleController {
  async handle(request: Request, response: Response) {
    const module_id = Number(request.params.module_id);
    const deleteModuleService = new DeleteModuleService();

    try {
      const module = await deleteModuleService.execute({
        moduleId: Number(module_id),
      });
      return response.json({
        message: "Module deleted successfully",
        module,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
