import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/sign-in");
  }
  return (
    <div className="h-screen bg-gradient-to-br from-fuchsia-400 to bg-fuchsia-600 text-3xl font-bold font-(family-name:--font-roboto) ">
      This is the paragraph text
    </div>
  );
}

// font-[family-name:var(--font-geist-sans)]
