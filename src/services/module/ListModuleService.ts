import prismaClient from "../../prisma";

export class ListModuleService {
  async execute() {
    const modules = await prismaClient.module.findMany();
    return modules;
  }
}
