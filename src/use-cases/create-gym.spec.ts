import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory.gym-repository";
import { CreateGymUseCase } from "./create-gym.use-case";

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe("Create gym use case", () => {

  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymRepository);
  })

  it("should be able crated a gym", async () => {
  
    const { gym } = await sut.execute({
      title: 'Firt Gym',
      description: null,
      phone: null,
      latitude: -12.707869,
      longetude: -38.3050427,
    });

    expect(gym.id).toEqual(expect.any(String))
  });
});
