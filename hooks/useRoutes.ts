import { usePathname } from "next/navigation";
import { LogOutIcon, MessageCircleMoreIcon, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathName = usePathname();
  // const conversationId = useConversation();
  const routes = [
    {
      label: "Chat",
      href: "/conversations",
      icon: MessageCircleMoreIcon,
      active: pathName.includes("conversations"),
    },
    {
      label: "Users",
      href: "/",
      icon: User2Icon,
      active: pathName === "/",
    },
    {
      label: "Logout",
      href: "#",
      icon: LogOutIcon,
      onClick: () => signOut(),
    },
  ];
  return routes;
};

export default useRoutes;
