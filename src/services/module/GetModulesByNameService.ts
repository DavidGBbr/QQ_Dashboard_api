import prismaClient from "../../prisma";

interface ModuleRequest {
  name: string;
}

export class GetModulesByNameService {
  async execute({ name }: ModuleRequest) {
    try {
      const modules = await prismaClient.module.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      });
      return modules;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
