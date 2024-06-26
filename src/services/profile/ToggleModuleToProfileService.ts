import prismaClient from "../../prisma";

interface ToggleModuleRequest {
  profile_id: number;
  module_id: number;
}

export class ToggleModuleToProfileService {
  async execute({ profile_id, module_id }: ToggleModuleRequest) {
    try {
      const profileExists = await prismaClient.profile.findFirst({
        where: { profileId: profile_id },
      });

      if (!profileExists) {
        throw new Error("Profile does not exist!");
      }

      const moduleExists = await prismaClient.module.findFirst({
        where: { moduleId: module_id },
      });

      if (!moduleExists) {
        throw new Error("Module does not exist!");
      }

      const existingRelation = await prismaClient.profileModule.findUnique({
        where: {
          profileId_moduleId: {
            profileId: profile_id,
            moduleId: module_id,
          },
        },
      });

      if (existingRelation) {
        await prismaClient.profileModule.delete({
          where: {
            profileId_moduleId: {
              profileId: profile_id,
              moduleId: module_id,
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
            profileId: profile_id,
            moduleId: module_id,
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
