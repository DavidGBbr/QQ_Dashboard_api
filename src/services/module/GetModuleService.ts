import prismaClient from "../../prisma";

interface UserRequest {
  module_id: number;
}

export class GetModuleService {
  async execute({ module_id }: UserRequest) {
    try {
      const response = await prismaClient.module.findFirst({
        where: {
          moduleId: module_id,
        },
        include: {
          moduleTransaction: {
            include: {
              transaction: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
