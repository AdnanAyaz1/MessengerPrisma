"use client";

import React from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { ExtendedMessage } from "@/types/types";
import Avatar from "../Avatar";

const MessageBox = ({ data, isLast = false }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const container = clsx(
    "flex gap-3 p-4",
    isOwn ? "justify-end" : "justify-start"
  );

  const avatar = clsx(isOwn && "order-2");

  const body = clsx(
    "flex flex-col gap-2",
    isOwn ? "items-end" : "items-start"
  );

  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-[18px]",
    isOwn ? "rounded-br-none" : "rounded-bl-none",
    "py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender?.username}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image
              onClick={() => setImageModalOpen(true)}
              alt="Image"
              height="288"
              width="288"
              src={data.image}
              className="
                object-cover
                cursor-pointer
                hover:scale-110
                transition
                translate
              "
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
