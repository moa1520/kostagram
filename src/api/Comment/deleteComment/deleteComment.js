import { isAuthenticated } from "../../../middlewears";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteComment: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;

      const comment = await prisma.deleteComment({ id });

      return comment;
    }
  }
};
