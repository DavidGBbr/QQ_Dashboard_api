import { Request, Response } from "express";
import { GetFunctionsByNameService } from "../../services/function/GetFunctionsByNameService";

export class GetFunctionsByNameController {
  async handle(request: Request, response: Response) {
    const { name } = request.query;
    const getFunctionsService = new GetFunctionsByNameService();

    try {
      const functions = await getFunctionsService.execute({
        name: String(name),
      });
      return response.json(functions);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}
