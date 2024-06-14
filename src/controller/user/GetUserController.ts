import { Request, Response } from "express";
import { GetUserService } from "../../services/user/GetUserService";

export class GetUserController {
  async handle(request: Request, response: Response) {
    const user_id = Number(request.params.user_id);
    const getUserService = new GetUserService();

    const user = await getUserService.execute({ user_id });
    return response.json(user);
  }
}
