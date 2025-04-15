import type { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middleware/verify-jwt";
import { CreateGymController } from "./create";
import { SearchGymController } from "./search";
import { NearbyGymController } from "./nearby";

export async function GymRoutes(app: FastifyInstance) {
  app.addHook("onRequest", VerifyJWT);
  app.get("/gyms/search", SearchGymController);
  app.get("/gyms/nearby", NearbyGymController);
  app.post("/gyms", CreateGymController);
}
