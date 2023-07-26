import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileService } from "../factories/make-get-user-profile-service";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileService();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      parsword_hash: undefined,
    },
  });
}
