import { PrismaCheckInRepository } from "../../repositories/prisma-repository/prisma-check-in.repository";
import { PrismaGymRepository } from "../../repositories/prisma-repository/prisma-gyms.repository";
import { PrismaUsersRepository } from "../../repositories/prisma-repository/prisma.users.repository";
import { AuthenticatedUseCase } from "../authenticated.use-case";
import { CheckInsUseCase } from "../check-in.use-case";

export function makeCheckInUseCase() {
  const prismaRepository = new PrismaCheckInRepository();
  const gymRepository = new PrismaGymRepository();
  const useCase = new CheckInsUseCase(prismaRepository,gymRepository);

  return useCase;
}
