import { PrismaUsersRepository } from "../../repositories/prisma-repository/prisma.users.repository";
import { GetUserProfileUseCase } from "../get-user-profile.use-case";

export function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(userRepository);

  return useCase;
}
