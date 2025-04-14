import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import dayjs from "dayjs";
import { LateCheckInValidateError } from "./errors/late-check-in-validate";

interface ValidateCheckInsRequest {
  checkInId: string;
}

interface ValidateCheckInsReponse {
  checkIn: CheckIn;
}

export class ValidateCheckInsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInsRequest): Promise<ValidateCheckInsReponse> {
    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    const distanceInMinutesFromCheckInCreate = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreate) {
      throw new LateCheckInValidateError();
    }

    checkIn.is_validated = new Date();

    await this.checkInRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}

// TDD: red (faz bugar), green (faz funcionar)
