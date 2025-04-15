import { ZodError } from "zod";
import { UsersRoutes } from "./http/controllers/users/routes";
import fastify from "fastify";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { GymRoutes } from "./http/controllers/gym/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(UsersRoutes);
app.register(GymRoutes);
// app.register(CheckInRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: fazer o else :P
  }

  return reply.status(500).send({ message: "internal server error" });
});
