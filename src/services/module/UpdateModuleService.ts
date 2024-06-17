import prismaClient from "../../prisma";

interface ModuleRequest {
  moduleId: number;
  name: string;
}

export class UpdateModuleService {
  async execute({ moduleId, name }: ModuleRequest) {
    try {
      const moduleAlreadyExists = await prismaClient.module.findFirst({
        where: {
          moduleId: moduleId,
        },
      });

      if (!moduleAlreadyExists) {
        throw new Error("Module not exists!");
      }

      const moduleUpdated = await prismaClient.module.update({
        where: {
          moduleId: moduleId,
        },
        data: {
          name,
        },
        select: {
          name: true,
        },
      });

      return moduleUpdated;
    } catch (error) {
      console.log(error);
      throw new Error("Error an update the module!");
    }
  }
}
