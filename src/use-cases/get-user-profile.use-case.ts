import { User } from "@prisma/client";
import { UsersRepository } from "../repositories/users.repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileReponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId
  }: GetUserProfileRequest): Promise<GetUserProfileReponse> {
    const user = await this.usersRepository.findById(userId);

    if(!user) {
      throw new ResourceNotFoundError();
    }

    return { user }
  }
}
