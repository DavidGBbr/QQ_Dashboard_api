import { Request, Response } from "express";
import { CreateProfileService } from "../../services/profile/CreateProfileService";

export class CreateProfileController {
  async handle(request: Request, response: Response) {
    const { moduleId, name } = request.body;
    const createProfileService = new CreateProfileService();

    try {
      const profile = await createProfileService.execute({
        moduleId,
        name,
      });
      return response.json(profile);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
