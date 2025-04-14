import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInRepository } from "../repositories/in-memory/in-memory.checkin.repository";
import { GetUserMetricsUseCaseUseCase } from "./get-metrics.use-case";

let checkinRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCaseUseCase;

describe("get user metrics use case", () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCaseUseCase(checkinRepository);
  });

  it("should be able to get check ins count from metrics", async () => {
    await checkinRepository.create({
      gym_id: "gym-110",
      user_id: "user-01",
    });

    await checkinRepository.create({
      gym_id: "gym-112",
      user_id: "user-01",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
