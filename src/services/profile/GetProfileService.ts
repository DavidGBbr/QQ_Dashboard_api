import prismaClient from "../../prisma";

interface UserRequest {
  profile_id: number;
}

export class GetProfileService {
  async execute({ profile_id }: UserRequest) {
    try {
      const response = await prismaClient.profile.findFirst({
        where: {
          profileId: profile_id,
        },
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
