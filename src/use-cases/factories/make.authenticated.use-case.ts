import { PrismaUsersRepository } from "../../repositories/prisma-repository/prisma.users.repository";
import { AuthenticatedUseCase } from "../authenticated.use-case";

export function makeAuthenticatedUseCase() {
  const prismaRepository = new PrismaUsersRepository();
  const authenticatedUseCase = new AuthenticatedUseCase(prismaRepository);

  return authenticatedUseCase;
}
