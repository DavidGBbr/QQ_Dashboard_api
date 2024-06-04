import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, name, password, profileId } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      email,
      name,
      password,
      profileId,
    });
    return response.json(user);
  }
}
