import type { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middleware/verify-jwt";
import { RegisterController } from "./register";
import { AuthenticatedController } from "./authenticated";
import { ProfileController } from "./profile";

export async function UsersRoutes(app: FastifyInstance) {
  app.post("/users", RegisterController);
  app.post("/sessions", AuthenticatedController);

  // authenticated
  app.get("/me", { onRequest: [VerifyJWT] }, ProfileController);
}