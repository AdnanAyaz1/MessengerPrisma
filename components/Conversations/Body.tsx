"use client";
import { ExtendedMessage } from "@/types/types";
import React, { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";

const Body = ({ messages }: { messages: ExtendedMessage[] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
  }, []);
  return (
    <div className="flex-1 overflow-y-auto">
      {" "}
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
