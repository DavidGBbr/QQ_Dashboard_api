import prismaClient from "../../prisma";

interface ProfileRequest {
  name: string;
}

export class GetProfilesByNameService {
  async execute({ name }: ProfileRequest) {
    try {
      const profiles = await prismaClient.profile.findMany({
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
      });
      return profiles;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
