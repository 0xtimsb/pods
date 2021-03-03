import { BorderBox, Flex } from "@primer/components";
import { useEffect, useState } from "react";
import {
  Message,
  NewMessagesSubscription,
  useNewMessagesSubscription,
} from "../generated/graphql";

import MessageBox from "./MessageBox";

interface MessagePanelProps {
  podId: number;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ podId }) => {
  const { data, loading } = useNewMessagesSubscription({
    variables: { podId },
  });

  const [messages, setMessages] = useState<
    NonNullable<NewMessagesSubscription["newMessages"]>[]
  >([]);

  useEffect(() => {
    if (data && data.newMessages) {
      const newMessage = data.newMessages;
      setMessages([...messages, newMessage]);
    }
  }, [data]);

  return (
    <BorderBox
      flexDirection="column"
      flex={1}
      height="100%"
      justifyContent="flex-end"
      bg="gray.1"
      p={3}
    >
      {messages.map((message) => (
        <MessageBox message={message} />
      ))}
    </BorderBox>
  );
};

export default MessagePanel;
