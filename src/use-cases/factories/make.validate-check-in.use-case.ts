import { PrismaCheckInRepository } from "../../repositories/prisma-repository/prisma-check-in.repository";
import { ValidateCheckInsUseCase } from "../validate-check-in.use-case";

export function makeValidateCheckInUseCase() {
  const checkinRepository = new PrismaCheckInRepository();
  const useCase = new ValidateCheckInsUseCase(checkinRepository);

  return useCase;
}
