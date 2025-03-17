import prisma from "@/lib/prismadb";
import { apiResponse, handleApiError } from "@/lib/utils";

export async function POST(req: Request) {
  const username = await req.json();
  try {
    // Check if the username is already taken
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (existingUser) {
      return apiResponse(`${username} is not available.`, false, 409);
    }

    return apiResponse(`${username} is available.`, true, 200);
  } catch (error) {
    return handleApiError(error);
  }
}
