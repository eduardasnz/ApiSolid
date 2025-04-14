import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory.checkin.repository";
import { ValidateCheckInsUseCase } from "./validate-check-in.use-case";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { LateCheckInValidateError } from "./errors/late-check-in-validate";

let checkInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInsUseCase;

describe("validate check-in use case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInsUseCase(checkInRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to valitade the check-in", async () => {
    const createCheckIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createCheckIn.id,
    });

    expect(checkIn.is_validated).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].is_validated).toEqual(expect.any(Date));
  });

  it("should not be able to valitade the inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "nao-existe-esse-check-in",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in 20 minutes of the creation", async () => {
    vi.setSystemTime(new Date(2025, 5, 12, 40, 0, 0));

    const createCheckIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const TrintaMinutosDepois = 1000 * 60 * 31;

    vi.advanceTimersByTime(TrintaMinutosDepois);

    await expect(() =>
      sut.execute({
        checkInId: createCheckIn.id,
      })
    ).rejects.toBeInstanceOf(LateCheckInValidateError);
  });
});
