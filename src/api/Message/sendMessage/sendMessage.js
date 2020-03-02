import axios from "axios";
import { prisma } from "../../../../generated/prisma-client";

const TOKEN = "ExponentPushToken[3FA0FuNQyAS6tHuSoImZc6]";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      const { data } = await axios.post(
        "https://exp.host/--/api/v2/push/send",
        {
          to: TOKEN,
          title: "새 메시지가 도착했습니다",
          body: message
        }
      );
      console.log(data);
      let room;
      if (roomId === undefined) {
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }]
            }
          });
        }
      } else {
        room = await prisma.room({ id: roomId });
      }
      if (!room) {
        throw Error("Room not found");
      }
      const participants = await prisma.room({ id: roomId }).participants();
      const getTo = participants.filter(
        participant => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: { id: roomId ? getTo.id : toId }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
    }
  }
};
