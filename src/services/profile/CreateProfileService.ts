import prismaClient from "../../prisma";

interface ProfileRequest {
  moduleId: number;
  name: string;
}

export class CreateProfileService {
  async execute({ moduleId, name }: ProfileRequest) {
    let profile = await prismaClient.profile.findFirst({
      where: {
        name,
      },
    });

    if (!profile) {
      profile = await prismaClient.profile.create({
        data: {
          name,
        },
      });
    }

    const profileModuleExists = await prismaClient.profileModule.findFirst({
      where: {
        profileId: profile.profileId,
        moduleId,
      },
    });

    if (profileModuleExists) {
      throw new Error("Profile is already associated with this module");
    }

    const profileModule = await prismaClient.profileModule.create({
      data: {
        profileId: profile.profileId,
        moduleId,
      },
    });

    return { profile, profileModule };
  }
}
