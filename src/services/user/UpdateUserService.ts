import prismaClient from "../../prisma";

interface UserRequest {
  userId: number;
  name: string;
  email: string;
  profileId: number;
}

export class UpdateUserService {
  async execute({ userId, name, email, profileId }: UserRequest) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          userId: userId,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("User not exists!");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          userId: userId,
        },
        data: {
          name,
          email,
          profileId: profileId,
        },
        select: {
          name: true,
          email: true,
          profile: true,
        },
      });

      return userUpdated;
    } catch (error) {
      console.log(error);
      throw new Error("Error an update the user!");
    }
  }
}
