import prismaClient from "../../prisma";

interface ProfileRequest {
  profileId: number;
}

export class DeleteProfileService {
  async execute({ profileId }: ProfileRequest) {
    const profileExists = await prismaClient.profile.findUnique({
      where: { profileId: profileId },
    });

    if (!profileExists) {
      throw new Error("Profile not found");
    }

    const userAssociated = await prismaClient.user.findFirst({
      where: { profileId: profileId },
    });

    if (userAssociated) {
      throw new Error("Cannot delete profile with associated users");
    }

    await prismaClient.profileModule.deleteMany({
      where: { profileId: profileId },
    });

    const deletedProfile = await prismaClient.profile.delete({
      where: { profileId: profileId },
    });

    return deletedProfile;
  }
}
