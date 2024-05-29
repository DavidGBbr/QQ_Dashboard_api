import { Request, Response } from "express";
import { CreateModuleService } from "../../services/module/CreateModuleService";

export class CreateModuleController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const createModuleService = new CreateModuleService();

    const module = await createModuleService.execute({ name });
    return response.json(module);
  }
}
