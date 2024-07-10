import { Request, Response } from "express";
import { GetModulesByNameService } from "../../services/module/GetModulesByNameService";

export class GetModulesByNameController {
  async handle(request: Request, response: Response) {
    const { name } = request.query;
    const getModulesService = new GetModulesByNameService();

    try {
      const modules = await getModulesService.execute({ name: String(name) });
      return response.json(modules);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
