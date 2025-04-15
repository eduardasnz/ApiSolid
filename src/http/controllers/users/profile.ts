import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserProfileUseCase } from "../../../use-cases/get-user-profile.use-case";
import { PrismaUsersRepository } from "../../../repositories/prisma-repository/prisma.users.repository";

export async function ProfileController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  await request.jwtVerify();

  const userRepository = new PrismaUsersRepository();
  const getProfile = new GetUserProfileUseCase(userRepository);

  const { user } = await getProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}