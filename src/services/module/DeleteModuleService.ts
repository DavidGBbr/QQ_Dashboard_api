import prismaClient from "../../prisma";

interface ModuleRequest {
  moduleId: number;
}

export class DeleteModuleService {
  async execute({ moduleId }: ModuleRequest) {
    const moduleExists = await prismaClient.module.findUnique({
      where: { moduleId: moduleId },
    });

    if (!moduleExists) {
      throw new Error("Module not found");
    }

    const profileAssociated = await prismaClient.profileModule.findFirst({
      where: { moduleId: moduleId },
    });

    if (profileAssociated) {
      throw new Error("Cannot delete module with associated profiles");
    }

    await prismaClient.profileModule.deleteMany({
      where: { moduleId: moduleId },
    });

    await prismaClient.moduleTransaction.deleteMany({
      where: { moduleId: moduleId },
    });

    const deletedModule = await prismaClient.module.delete({
      where: { moduleId: moduleId },
    });

    return deletedModule;
  }
}
