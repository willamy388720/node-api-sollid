import { FetchUserCheckInsHistoryService } from "../../../services/fetch-user-check-ins-history";
import { PrismaCheckInRepository } from "../../../repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const service = new FetchUserCheckInsHistoryService(prismaCheckInRepository);

  return service;
}
