import { FastifyInstance } from "fastify";
import { VerifyJWT } from "../../middleware/verify-jwt";
import { createCheckIn } from "./create";
import { validateCheckIn } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";

export async function CheckInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', VerifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', createCheckIn)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)
};