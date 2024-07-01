import prismaClient from "../../prisma";

interface UserRequest {
  user_id: number;
}

export class GetUserService {
  async execute({ user_id }: UserRequest) {
    try {
      const response = await prismaClient.user.findFirst({
        where: {
          userId: user_id,
        },
        select: {
          userId: true,
          name: true,
          email: true,
          profileId: true,
          createdAt: true,
          updatedAt: true,
          profile: {
            select: {
              name: true,
            },
          },
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
