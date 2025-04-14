import { PrismaUsersRepository } from "../../repositories/prisma-repository/prisma.users.repository";
import { RegisterUseCase } from "../register.use-case";

export function makeRegisterUseCase() {
  const prismaRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaRepository);

  return registerUseCase;
}
