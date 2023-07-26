import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository";
import { AuthenticationService } from "../../../services/authenticate";

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticationService(prismaUsersRepository);

  return authenticateService;
}
