import { Request, Response } from "express";
import { UpdatePasswordService } from "../../services/user/UpdatePasswordService";

export class UpdatePasswordController {
  async handle(request: Request, response: Response) {
    const { token } = request.params;
    const { email, password } = request.body;
    const updatePassword = new UpdatePasswordService();

    try {
      const newPassword = await updatePassword.execute({
        token,
        email,
        password,
      });

      return response.json(newPassword);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
