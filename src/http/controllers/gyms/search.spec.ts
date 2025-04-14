import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../app";
import { createAndAuthenticateUser } from "../../../utils/create-user-authenticated-user";

describe("Search Gym e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search gym.", async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Also Gym",
        description: "also new gym",
        phone: "00129931231",
        latitude: -12.707869,
        longetude: -38.1120427,
      });

      await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "new new Gym",
        description: "new new new gym",
        phone: "00129931231",
        latitude: -12.707455,
        longetude: -38.3050427,
      });

      const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'new new Gym'
      })
      .set("Authorization", `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'new new Gym'
      })
    ]);
  });
});
