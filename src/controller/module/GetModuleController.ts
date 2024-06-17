import { Request, Response } from "express";
import { GetModuleService } from "../../services/module/GetModuleService";

export class GetModuleController {
  async handle(request: Request, response: Response) {
    const module_id = Number(request.params.module_id);
    const getModuleService = new GetModuleService();

    const module = await getModuleService.execute({ module_id });
    return response.json(module);
  }
}
