import prismaClient from "../../prisma";

export class ListProfileService {
  async execute() {
    const transactions = await prismaClient.profile.findMany();

    return transactions;
  }
}
