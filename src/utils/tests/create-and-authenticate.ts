import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticate(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "Zé das Cabras",
    email: "zedascabras@mmmexamplex.com",
    password: "123456",
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "zedascabras@mmmexamplex.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
