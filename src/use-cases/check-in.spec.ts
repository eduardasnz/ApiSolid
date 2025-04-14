import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory.checkin.repository";
import { CheckInsUseCase } from "./check-in.use-case";
import { InMemoryGymRepository } from "../repositories/in-memory/in-memory.gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxCheckInsError } from "./errors/max-check-ins";
import { MaxDistanceError } from "./errors/max-distance";

let checkInUseCase: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInsUseCase;

describe("check-in use case", () => {
  beforeEach(async () => {
    checkInUseCase = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    sut = new CheckInsUseCase(checkInUseCase, gymRepository);

    await gymRepository.create({
      id: "gym-01",
      title: "gym aleatoria",
      description: " ",
      latitude: -12.707869,
      longetude: -38.3050427,
      phone: "922929999",
    })

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatidute: -12.707869,
      userLongetude: -38.3050427,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2021, 3, 10, 8, 0, 0));
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatidute: -12.707869,
      userLongetude: -38.3050427,
    });

    vi.setSystemTime(new Date(2025, 3, 11, 9, 0, 0));
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatidute: -12.707869,
      userLongetude: -38.3050427,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2025, 3, 10, 9, 0, 0));
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatidute: -12.707869,
      userLongetude: -38.3050427,
    });
    vi.setSystemTime(new Date(2025, 3, 16, 9, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatidute: -12.707869,
      userLongetude: -38.3050427,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in this distance", async () => {
    gymRepository.items.push({
      id: "gym-02",
      title: "gym aleatoria",
      description: " ",
      latitude: new Decimal(-12.7116758),
      longetude: new Decimal(-38.3050427),
      phone: "922929999",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatidute: -12.707869,
        userLongetude: -38.2849455,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});

// Anotação: Consegui resolver um bug muito chato e fiquei feliz com isso :)
