import { PrismaGymRepository } from "../../repositories/prisma-repository/prisma-gyms.repository";
import { CreateGymUseCase } from "../create-gym.use-case";

export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymRepository();
  const useCase = new CreateGymUseCase(gymRepository);

  return useCase;
}
