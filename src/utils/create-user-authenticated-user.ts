import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "john doe 2",
    email: `johndoeef.2@gmail.com`,
    password: "00010",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: `johndoeef.2@gmail.com`,
    password: "00010",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
