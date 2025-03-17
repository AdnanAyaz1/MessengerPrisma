import prisma from "@/lib/prismadb";
import { getUser } from "./getUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error: any) {
    return null;
  }
};

export default getConversationById;
