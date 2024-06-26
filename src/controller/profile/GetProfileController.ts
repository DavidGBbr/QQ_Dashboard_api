import { Request, Response } from "express";
import { GetProfileService } from "../../services/profile/GetProfileService";

export class GetProfileController {
  async handle(request: Request, response: Response) {
    const profile_id = Number(request.params.profile_id);
    const getProfileService = new GetProfileService();

    const profile = await getProfileService.execute({ profile_id });
    return response.json(profile);
  }
}
