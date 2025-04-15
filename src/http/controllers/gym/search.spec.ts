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
        title: "Ginásio Perto",
        description: "Um ginásio perto de você",
        phone: "00129931231",
        latitude: -12.100000, // Exemplo de latitude
        longetude: -38.100000, // Exemplo de longitude
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Ginásio Longe",
        description: "Um ginásio bem longe",
        phone: "00129931232",
        latitude: -15.000000, 
        longetude: -40.000000, 
      });


    const response = await request(app.server)
    .get("/gyms/nearby")
    .query({
      query: "Ginásio Perto",
      latitude: -12.100500, 
      longetude: -38.100500,
    })
    .set("Authorization", `Bearer ${token}`)
    .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Ginásio Perto",
      }),
    ]);
  });
});