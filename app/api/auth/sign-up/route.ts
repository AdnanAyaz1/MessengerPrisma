import { signUpSchema } from "@/lib/zod-validation-schemas";

export async function post(req: Request, res: Response) {
  const { username, email, password } = await req.json();
  try {
    const validatedData = signUpSchema.safeParse({
      username,
      email,
      password,
    });

    if (!validatedData.success)
      console.log("Error", validatedData.error.flatten().fieldErrors);
  } catch (error) {}
}
