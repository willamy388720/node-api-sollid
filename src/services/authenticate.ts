import { UsersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credententials-error";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticationServiceRequest {
  email: string;
  password: string;
}

interface AuthenticationServiceResponse {
  user: User;
}

export class AuthenticationService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticationServiceRequest): Promise<AuthenticationServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
