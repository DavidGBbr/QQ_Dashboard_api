import prismaClient from "../../prisma";

interface UserRequest {
  user_id: number;
}

export class DeleteUserService {
  async execute({ user_id }: UserRequest) {
    const userExists = await prismaClient.user.findUnique({
      where: {
        userId: user_id,
      },
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    const user = await prismaClient.user.delete({
      where: {
        userId: user_id,
      },
    });

    return user;
  }
}
