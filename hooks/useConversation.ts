
import { useParams } from "next/navigation";

const useConversation = () => {
  const params = useParams();
  const conversationId = params?.conversationId ?? "";
  const isOpen = Boolean(conversationId);

  return { isOpen, conversationId };
};

export default useConversation;
