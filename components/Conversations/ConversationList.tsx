"use client";

import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { ExtendedConversation, ExtendedUser } from "@/types/types";
import { UserPlus } from "lucide-react";
import ConversationBox from "./ConversationBox";
import useConversation from "@/hooks/useConversation";

interface ConversationListProps {
  initialItems: ExtendedConversation[];
  users: ExtendedUser[];
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  return (
    <>
      <aside
        className={clsx(
          `
          fixed
          inset-y-0
          pb-20
          lg:pb-0
          lg:left-20
          lg:w-60
          lg:block
          overflow-y-auto
          border-r
          border-gray-200
        `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between items-center mb-4 pt-4">
            <div
              className="
              text-2xl
              font-bold
              text-neutral-800
            "
            >
              Messages
            </div>
            <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 cursor-pointer">
              <UserPlus size={15} />
            </div>
            {/* <div
              onClick={() => setIsModalOpen(true)}
              className="
                rounded-full
                p-2
                bg-gray-100
                text-gray-600
                cursor-pointer
                hover:opacity-75
                transition
              "
            ></div> */}
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
