import { BorderBox, Box, Flex } from "@primer/components";
import { useEffect, useState } from "react";
import {
  Message,
  NewMessagesSubscription,
  useMessagesQuery,
  useNewMessagesSubscription,
} from "../generated/graphql";

import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

interface MessagePanelProps {
  podId: number;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ podId }) => {
  const { data: paginatedData } = useMessagesQuery({
    variables: { podId, limit: 10 },
  });

  const { data, loading } = useNewMessagesSubscription({
    variables: { podId },
  });

  const [messages, setMessages] = useState<
    NonNullable<NewMessagesSubscription["newMessages"]>[]
  >([]);

  useEffect(() => {
    if (data && data.newMessages) {
      const newMessage = data.newMessages;
      // To avoid repeatation of any message, if occured due to some glitch.
      const found = messages.find((message) => message.id === newMessage.id);
      if (!found) setMessages([newMessage, ...messages]);
    }
  }, [data]);

  return (
    <Flex flexDirection="column" flex={1}>
      <BorderBox
        flex={1}
        borderWidth={1}
        borderBottomWidth={0}
        borderRadius={2}
        borderBottomRightRadius={0}
        borderBottomLeftRadius={0}
        overflowY="scroll"
        display="flex"
        flexDirection="column-reverse"
      >
        {paginatedData &&
          paginatedData.messages.result.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))}
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </BorderBox>
      <MessageInputBox podId={podId} />
    </Flex>
  );
};

export default MessagePanel;
