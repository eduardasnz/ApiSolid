import type { Gym } from "@prisma/client";
import type { GymsRepository } from "../repositories/gym-repository";

interface FetchSearchNearbyGymUseCaseRequest {
  userLatidute: number
  userLongetude: number
}

interface FetchSearchNearbyGymUseCaseReponse {
  gyms: Gym[]
}

export class FetchSearchNearbyGymUseCaseUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatidute,
    userLongetude
  }: FetchSearchNearbyGymUseCaseRequest): Promise<FetchSearchNearbyGymUseCaseReponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatidute,
      longetude: userLongetude
    });
    
    return { gyms }
  }
}