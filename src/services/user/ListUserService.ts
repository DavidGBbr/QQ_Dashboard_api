import prismaClient from "../../prisma";

export class ListUserService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        name: true,
        email: true,
        profile: true,
      },
    });
    return users;
  }
}
