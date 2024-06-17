import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const user_id = Number(request.params.user_id);
    const deleteUserService = new DeleteUserService();

    try {
      const user = await deleteUserService.execute({
        user_id: Number(user_id),
      });
      return response.json({ message: "User deleted successfully", user });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
