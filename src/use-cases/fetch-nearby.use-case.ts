import type { Gym } from "@prisma/client";
import type { GymsRepository } from "../repositories/gym-repository";

interface FetchSearchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongetude: number
}

interface FetchSearchNearbyGymUseCaseReponse {
  gyms: Gym[]
}

export class FetchSearchNearbyGymUseCaseUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongetude
  }: FetchSearchNearbyGymUseCaseRequest): Promise<FetchSearchNearbyGymUseCaseReponse> {
    const gyms = await this.gymRepository.findManyNearBy({
      latitude: userLatitude,
      longetude: userLongetude
    });
    
    return { gyms }
  }
}