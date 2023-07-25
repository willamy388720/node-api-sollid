import { expect, describe, it, beforeEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticationService } from "../services/authenticate";
import { InvalidCredentialsError } from "../services/errors/invalid-credententials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticationService;

describe("Authenticate Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticationService(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "Zé das Cabras",
      email: "zecabras@email.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "zecabras@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "zecabras@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "Zé das Cabras",
      email: "zecabras@email.com",
      password_hash: await hash("123123", 6),
    });

    await expect(() =>
      sut.execute({
        email: "zecabras@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
