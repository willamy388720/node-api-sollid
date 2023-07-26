import { app } from "@/app";
import { createAndAuthenticate } from "@/utils/tests/create-and-authenticate";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able search gyms by title", async () => {
    const { token } = await createAndAuthenticate(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Fico forte",
        description: "Lorem ipsum dolor sit amet, consectetur adip",
        phone: "11999999999",
        latitude: -3.8282367,
        longitude: -38.5699798,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Fico monstro",
        description: "Lorem ipsum dolor sit amet, consectetur adip",
        phone: "11999999999",
        latitude: -3.8282367,
        longitude: -38.5699798,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: "monstro",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Fico monstro",
      }),
    ]);
  });
});
