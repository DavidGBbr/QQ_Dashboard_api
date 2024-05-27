import { Request, Response } from "express";
import { ListModuleService } from "../../services/module/ListModuleService";

export class ListModuleController {
  async handle(request: Request, response: Response) {
    const listModuleService = new ListModuleService();

    const modules = await listModuleService.execute();
    return response.json(modules);
  }
}
