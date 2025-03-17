import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { User } from "@prisma/client";
import { ExtendedConversation } from "@/types/types";

const useOtherUser = (
  conversation:
    | ExtendedConversation
    | {
        users: User[];
      }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;

    const otherUser = conversation.users?.filter(
      (user) => user.email !== currentUserEmail
    );

    return otherUser ? otherUser[0] : null;
  }, [session?.data?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
