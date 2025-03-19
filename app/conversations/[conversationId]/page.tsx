import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/Conversations/Body";
import Header from "@/components/Conversations/Header";
import EmptyState from "@/components/EmptyState";
import MessageForm from "@/components/Forms/MessageForm";
import React from "react";

interface IParams {
  conversationId: string;
}
const page = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-100 ">
      <div className="flex flex-col min-h-screen max-h-screen">
        <Header conversation={conversation} />
        <Body messages={messages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default page;
