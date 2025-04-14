import type { Gym, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number
  longetude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearBy(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}