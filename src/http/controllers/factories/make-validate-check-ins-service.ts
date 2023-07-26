import { PrismaCheckInRepository } from "../../../repositories/prisma/prisma-check-ins-repository";
import { ValidateCheckInService } from "../../../services/validate-check-ins";

export function makeGetValidateCheckInsService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const service = new ValidateCheckInService(prismaCheckInRepository);

  return service;
}
