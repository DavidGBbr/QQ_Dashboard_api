import prismaClient from "../../prisma";

interface ProfileRequest {
  profileId: number;
  name?: string;
  moduleId: number;
}

export class UpdateProfileService {
  async execute({ profileId, name, moduleId }: ProfileRequest) {
    try {
      const profileExists = await prismaClient.profile.findFirst({
        where: { profileId: profileId },
      });

      if (!profileExists) {
        throw new Error("Profile does not exist!");
      }

      const moduleExists = await prismaClient.module.findFirst({
        where: { moduleId: moduleId },
      });

      if (!moduleExists) {
        throw new Error("Module does not exist!");
      }

      if (name) {
        await prismaClient.profile.update({
          where: { profileId: profileId },
          data: { name: name },
        });
      }

      const existingRelation = await prismaClient.profileModule.findUnique({
        where: {
          profileId_moduleId: {
            profileId: profileId,
            moduleId: moduleId,
          },
        },
      });

      if (existingRelation) {
        await prismaClient.profileModule.delete({
          where: {
            profileId_moduleId: {
              profileId: profileId,
              moduleId: moduleId,
            },
          },
        });
        return {
          message: "Module disassociated from profile.",
          associated: false,
        };
      } else {
        await prismaClient.profileModule.create({
          data: {
            profileId: profileId,
            moduleId: moduleId,
          },
        });
        return {
          message: "Module associated to profile.",
          associated: true,
        };
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error toggling module association to profile!");
    }
  }
}
