import { Request, Response } from "express";
import { ToggleModuleToProfileService } from "../../services/profile/ToggleModuleToProfileService";

export class ToggleModuleToProfileController {
  async handle(request: Request, response: Response) {
    const { profile_id, module_id } = request.body;
    const service = new ToggleModuleToProfileService();

    try {
      const result = await service.execute({ profile_id, module_id });
      return response.json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
