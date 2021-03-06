import { BorderBox, Box, Button, Flex } from "@primer/components";
import { useEffect, useRef, useState } from "react";
import {
  Message,
  NewMessagesSubscription,
  PodQuery,
  useMessagesLazyQuery,
  useMessagesQuery,
  useNewMessagesSubscription,
} from "../generated/graphql";

import useInfiniteScroll from "../hooks/useInfinteScroll";

import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

interface MessagePanelProps {
  pod: NonNullable<PodQuery["pod"]>;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ pod }) => {
  const scrollDiv = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollDiv && scrollDiv.current) {
      scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
    }
  };

  const { data: paginatedData } = useMessagesQuery({
    variables: { podId: pod.id, limit: 10 },
  });

  const { data, loading } = useNewMessagesSubscription({
    variables: { podId: pod.id },
  });

  const [messages, setMessages] = useState<
    NonNullable<NewMessagesSubscription["newMessages"]>[]
  >([]);

  useEffect(() => {
    if (data && data.newMessages) {
      const newMessage = data.newMessages;
      if (messages.filter((m) => m.id === newMessage.id).length === 0) {
        setMessages([...messages, newMessage]);
      }
    }
  }, [data]);

  // Fix scroll position on start.
  useEffect(() => scrollToBottom());

  // Fix scroll position on message received.
  useEffect(() => scrollToBottom(), [messages]);

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
        flexDirection="column"
        ref={scrollDiv}
      >
        {paginatedData &&
          paginatedData.messages.result.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))}
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </BorderBox>
      <MessageInputBox podId={pod.id} />
    </Flex>
  );
};

export default MessagePanel;
