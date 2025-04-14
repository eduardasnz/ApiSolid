import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory.gym-repository";
import { SearchGymUseCaseUseCase } from "./search-gym.use-case";

let gymRepository: InMemoryGymRepository;
let sut: SearchGymUseCaseUseCase;

describe("check-in use case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymRepository();
    sut = new SearchGymUseCaseUseCase(gymRepository);
  });

  it("should be able to search for gym", async () => {
    await gymRepository.create({
      title: "GymAcademia",
      description: null,
      phone: null,
      latitude: -12.7064718,
      longetude: -38.315487,
    });

    await gymRepository.create({
      title: "AcademiaGym",
      description: null,
      phone: null,
      latitude: -12.7082476,
      longetude: -38.3255649,
    });

    const { gyms } = await sut.execute({
      query: "AcademiaGym",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "AcademiaGym" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `New Gym - ${i}`,
        description: null,
        phone: null,
        latitude: -12.7082476,
        longetude: -38.3255649,
      });
    }

    const { gyms } = await sut.execute({
      query: "New Gym",
      page: 2
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "New Gym - 21" }),
      expect.objectContaining({ title: "New Gym - 22" }),
    ]);
  });
});
