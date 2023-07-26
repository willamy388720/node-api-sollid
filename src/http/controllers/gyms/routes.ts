import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { searchGyms } from "./search";
import { nearbyGyms } from "./nearby";
import { createGym } from "./create";

import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function gymssRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchGyms);
  app.get("/gyms/nearby", nearbyGyms);

  app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, createGym);
}
