import { Request, Response } from "express";
import { CreateModuleService } from "../../services/module/CreateModuleService";

export class CreateModuleController {
  async handle(request: Request, response: Response) {
    const { Nome } = request.body;
    const createModuleService = new CreateModuleService();

    const module = await createModuleService.execute({ Nome });
    return response.json(module);
  }
}
