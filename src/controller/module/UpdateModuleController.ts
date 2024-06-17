import { Request, Response } from "express";
import { UpdateModuleService } from "../../services/module/UpdateModuleService";

export class UpdateModuleController {
  async handle(request: Request, response: Response) {
    const { moduleId, name } = request.body;
    const updateModule = new UpdateModuleService();

    const module = await updateModule.execute({ moduleId, name });

    return response.json(module);
  }
}
