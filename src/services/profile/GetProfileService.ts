import prismaClient from "../../prisma";

interface ProfileRequest {
  profile_id: number;
}

export class GetProfileService {
  async execute({ profile_id }: ProfileRequest) {
    try {
      const response = await prismaClient.profile.findFirst({
        where: {
          profileId: profile_id,
        },
        include: {
          profileModule: {
            include: {
              module: true,
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
