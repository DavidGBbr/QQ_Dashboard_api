import prismaClient from "../../prisma";

interface ModuleRequest {
  name: string;
}

export class CreateModuleService {
  async execute({ name }: ModuleRequest) {
    const moduleAlreadyExists = await prismaClient.module.findFirst({
      where: {
        name,
      },
    });

    if (moduleAlreadyExists) {
      throw new Error("Module already exists");
    }

    const module = await prismaClient.module.create({
      data: {
        name,
      },
    });

    return { module };
  }
}
