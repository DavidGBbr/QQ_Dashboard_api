import prismaClient from "../../prisma";
import { hash } from "bcrypt";

interface UserRequest {
  email: string;
  name: string;
  password: string;
  profileId: number;
}

export class CreateUserService {
  async execute({ name, email, password, profileId }: UserRequest) {
    if (!email || email === "") {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User/Email already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        profileId: profileId,
      },
      select: {
        userId: true,
        name: true,
        email: true,
      },
    });

    return { user };
  }
}
