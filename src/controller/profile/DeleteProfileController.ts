import { Request, Response } from "express";
import { DeleteProfileService } from "../../services/profile/DeleteProfileService";

export class DeleteProfileController {
  async handle(request: Request, response: Response) {
    const profile_id = Number(request.params.profile_id);
    const deleteProfileService = new DeleteProfileService();

    try {
      const profile = await deleteProfileService.execute({
        profileId: Number(profile_id),
      });
      return response.json({
        message: "Profile deleted successfully",
        profile,
      });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
