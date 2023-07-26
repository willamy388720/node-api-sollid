import { PrismaGymsRepository } from "../../../repositories/prisma/prisma-gyms-repository";
import { CheckInService } from "../../../services/check-in";
import { PrismaCheckInRepository } from "../../../repositories/prisma/prisma-check-ins-repository";

export function makeCheckInService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const service = new CheckInService(
    prismaCheckInRepository,
    prismaGymsRepository
  );

  return service;
}
