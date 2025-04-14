import { PrismaGymRepository } from "../../repositories/prisma-repository/prisma-gyms.repository";
import { SearchGymUseCaseUseCase } from "../search-gym.use-case";

export function makeSearchGymUseCase() {
  const gymRepository = new PrismaGymRepository();
  const useCase = new SearchGymUseCaseUseCase(gymRepository);

  return useCase;
}
