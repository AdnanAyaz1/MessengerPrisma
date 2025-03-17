import { auth } from "@/auth";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";

export const getUser = async ({
  protectedRoute = false,
}: {
  protectedRoute?: boolean;
} = {}) => {
  const session = await auth();
  if (!session) {
    if (protectedRoute) {
      redirect("/sign-in");
    }
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });
  return user;
};
