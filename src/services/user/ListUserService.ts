import prismaClient from "../../prisma";

export class ListUserService {
  async execute() {
    const users = await prismaClient.user.findMany({
      select: {
        userId: true,
        name: true,
        email: true,
        profile: true,
      },
    });
    return users;
  }
}
