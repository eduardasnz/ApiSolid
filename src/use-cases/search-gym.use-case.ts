import type { Gym } from "@prisma/client";
import type { GymsRepository } from "../repositories/gym-repository";

interface SearchGymUseCaseRequest {
  query: string
  page: number
}

interface SearchGymUseCaseReponse {
  gyms: Gym[]
}

export class SearchGymUseCaseUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseReponse> {
    const gyms = await this.gymRepository.searchMany(query, page);
    
    return { gyms }
  }
}
