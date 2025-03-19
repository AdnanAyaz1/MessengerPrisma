import prisma from "@/lib/prismadb";
import { getUser } from "./getUser";

const getAllUsers = async () => {
  const user = await getUser();
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: user?.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};

export default getAllUsers;
