import { Request, Response } from "express";
import { ListProfileService } from "../../services/profile/ListProfileService";

export class ListProfileController {
  async handle(request: Request, response: Response) {
    const listProfileService = new ListProfileService();

    const profiles = await listProfileService.execute();
    return response.json(profiles);
  }
}
