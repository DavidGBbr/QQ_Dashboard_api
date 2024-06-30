import { hash, compare } from "bcrypt";
import prismaClient from "../../prisma";

interface UserRequest {
  token: string;
  email: string;
  password: string;
}

export class UpdatePasswordService {
  async execute({ token, email, password }: UserRequest) {
    if (!token) {
      throw new Error("Token is required!");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("User does not exist!");
    }

    if (typeof password !== "string") {
      throw new Error("Password must be a string");
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);
    if (passwordMatch) {
      throw new Error(
        "The new password cannot be the same as the old password"
      );
    }

    const saltRounds = 8;
    const newPasswordHash = await hash(password, saltRounds);

    await prismaClient.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPasswordHash,
      },
    });

    return { message: "Password updated" };
  }
}
