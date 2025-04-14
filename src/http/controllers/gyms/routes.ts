import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middleware/verify-jwt";
import { search } from "./search";
import { nearby } from "./nearby";
import { createGym } from "./create";

export async function GymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', createGym)
};