import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { createCheckIn } from "./create";
import { validateCheckIn } from "./validate";
import { historyCheckIns } from "./history";
import { metricsCheckIns } from "./metrics";

import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/history", historyCheckIns);
  app.get("/check-ins/metrics", metricsCheckIns);

  app.post("/gyms/:gymId/check-ins", createCheckIn);

  app.patch(
    "/check-ins/:checkInId/validate",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateCheckIn
  );
}
