import { AuthenticatedController } from "./authenticated.controller";
import { ProfileController } from "./profile.controller";
import { RegisterController } from "./register.controller"; 
import type { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middleware/verify-jwt";

export async function UsersRoutes(app: FastifyInstance) {
  app.post("/users", RegisterController);
  app.post("/sessions", AuthenticatedController);

  // authenticated
  app.get("/me", { onRequest: [VerifyJWT] }, ProfileController);
}
