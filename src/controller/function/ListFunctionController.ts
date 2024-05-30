import { Request, Response } from "express";
import { ListFunctionService } from "../../services/function/ListFunctionService";

export class ListFunctionController {
  async handle(request: Request, response: Response) {
    const listFunctionService = new ListFunctionService();

    const functions = await listFunctionService.execute();
    return response.json(functions);
  }
}
