import prismaClient from "../../prisma";

interface ModuleRequest {
  Nome: string;
}

export class CreateModuleService {
  async execute({ Nome }: ModuleRequest) {
    const moduleAlreadyExists = await prismaClient.modulo.findFirst({
      where: {
        Nome,
      },
    });

    if (moduleAlreadyExists) {
      throw new Error("Modulo already exists");
    }

    const module = await prismaClient.modulo.create({
      data: {
        Nome,
      },
    });

    return { module };
  }
}
