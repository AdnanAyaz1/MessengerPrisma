import getAllUsers from "@/actions/getAllUsers";
import getConversations from "@/actions/getConversations";
import { getUser } from "@/actions/getUser";
import ConversationList from "@/components/Conversations/ConversationList";
import DesktopSidebar from "@/components/Sidebar/DesktopSidebar";
import MobileFooter from "@/components/Sidebar/MobileFooter";
import { ExtendedUser } from "@/types/types";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser({ protectedRoute: true });
  const allUsers = await getAllUsers();
  const conversations = await getConversations();
  return (
    <div>
      <DesktopSidebar user={user as ExtendedUser} />
      <MobileFooter />
      <ConversationList
        users={allUsers as ExtendedUser[]}
        initialItems={conversations}
      />
      {children}
    </div>
  );
};

export default layout;
