import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";
import { prisma } from "../../../lib/prisma";
import { beforeEach } from "node:test";

describe("Search Gym e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  // beforeEach(async () => {
  //   await prisma.gym.deleteMany(); // limpa as academias
  // });

  it("should be able to search gym.", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia NODEJS",
        description: "uma nova academia",
        phone: "00129931231",
        latitude: -12.107869,
        longetude: -38.1050427,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Academia Typescript",
        description: "uma nova academia",
        phone: "00129931231",
        latitude: -12.707555,
        longetude: -38.3050777,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "Academia NODEJS",
        page: 1
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Academia NODEJS",
      }),
    ]);
  });
});
