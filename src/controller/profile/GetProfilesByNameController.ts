import { Request, Response } from "express";
import { GetProfilesByNameService } from "../../services/profile/GetProfilesByNameService";

export class GetProfilesByNameController {
  async handle(request: Request, response: Response) {
    const { name } = request.query;
    const getProfilesService = new GetProfilesByNameService();

    try {
      const profiles = await getProfilesService.execute({ name: String(name) });
      return response.json(profiles);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
