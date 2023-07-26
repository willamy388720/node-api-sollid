import { GetUserMetricsService } from "../../../services/get-user-metrics";
import { PrismaCheckInRepository } from "../../../repositories/prisma/prisma-check-ins-repository";

export function makeGetUserMetricsService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const service = new GetUserMetricsService(prismaCheckInRepository);

  return service;
}
