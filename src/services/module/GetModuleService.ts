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
        select: {
          moduleId: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
