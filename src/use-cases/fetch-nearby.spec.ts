import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory.gym-repository";
import { FetchSearchNearbyGymUseCaseUseCase } from "./fetch-nearby.use-case";

let gymRepository: InMemoryGymRepository;
let sut: FetchSearchNearbyGymUseCaseUseCase;

describe("fetch nearby gym use case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new FetchSearchNearbyGymUseCaseUseCase(gymRepository);
  });

  it("should be able to search for gym", async () => {
    await gymRepository.create({
      title: "GymAcademia",
      description: null,
      phone: null,
      latitude: -12.707869,
      longetude: -38.2849455,
    });

    await gymRepository.create({
      title: "AcademiaGym",
      description: null,
      phone: null,
      latitude: 12.6922098,
      longetude: -38.3344869,
    });

    const { gyms } = await sut.execute({
      userLatitude: -12.707869,
      userLongetude: -38.2849455,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "GymAcademia" })]);
  });

});
