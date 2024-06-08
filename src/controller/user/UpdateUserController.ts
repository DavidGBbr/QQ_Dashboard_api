import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { userId, name, email, profileId } = request.body;
    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({ userId, name, email, profileId });

    return response.json(user);
  }
}
