import { Request, Response } from "express";
import { GetFunctionService } from "../../services/function/GetFunctionService";

export class GetFunctionController {
  async handle(request: Request, response: Response) {
    const function_id = Number(request.params.function_id);
    const getFunctionService = new GetFunctionService();

    const _function = await getFunctionService.execute({ function_id });
    return response.json(_function);
  }
}
