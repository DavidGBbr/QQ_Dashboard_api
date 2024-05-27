import prismaClient from "../../prisma";

export class ListModuleService {
  async execute() {
    const modules = await prismaClient.modulo.findMany();
    return modules;
  }
}
