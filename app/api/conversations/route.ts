import { getUser } from "@/actions/getUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    // if (!currentUser?.id || !currentUser?.email) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    // if (isGroup && (!members || members.length < 2 || !name)) {
    //   return new NextResponse("Invalid data", { status: 400 });
    // }

    // if (isGroup) {
    //   const newConversation = await prisma.conversation.create({
    //     data: {
    //       name,
    //       isGroup,
    //       users: {
    //         connect: [
    //           ...members.map((member: { value: string }) => ({
    //             id: member.value,
    //           })),
    //           {
    //             id: currentUser.id,
    //           },
    //         ],
    //       },
    //     },
    //     include: {
    //       users: true,
    //     },
    //   });
    // }
    const exisitingConversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser?.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser?.id],
            },
          },
        ],
      },
    });

    if (exisitingConversation) {
      return NextResponse.json(exisitingConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser?.id,
            },
            {
              id: userId,
            },
          ],
        },
        lastMessageAt: new Date(),
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    console.error("Error creating conversation:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
