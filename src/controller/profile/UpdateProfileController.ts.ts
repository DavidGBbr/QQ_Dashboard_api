import { Request, Response } from "express";
import { UpdateProfileService } from "../../services/profile/UpdateProfileService";

export class UpdateProfileController {
  async handle(request: Request, response: Response) {
    const { profileId, name, moduleId } = request.body;
    const service = new UpdateProfileService();

    try {
      const result = await service.execute({ profileId, name, moduleId });
      return response.json(result);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }
  }
}
