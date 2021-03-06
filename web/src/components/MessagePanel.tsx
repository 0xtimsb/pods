import { gql, useApolloClient } from "@apollo/client";
import { BorderBox, Flex } from "@primer/components";
import { useEffect, useState } from "react";

// Graphql
import {
  NewMessagesSubscription,
  PodQuery,
  useMessagesLazyQuery,
  useMessagesQuery,
  useNewMessagesSubscription,
} from "../generated/graphql";
import useMessageScroll from "../hooks/useMessageScroll";

// Components
import MessageBox from "./MessageBox";
import MessageInputBox from "./MessageInputBox";

interface MessagePanelProps {
  pod: NonNullable<PodQuery["pod"]>;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ pod }) => {
  const { data: paginatedData, fetchMore } = useMessagesQuery({
    variables: { podId: pod.id, limit: 10 },
  });

  const { data } = useNewMessagesSubscription({
    variables: { podId: pod.id },
  });

  const [messages, setMessages] = useState<
    NonNullable<NewMessagesSubscription["newMessages"]>[]
  >([]);

  async function fetchMoreMessages() {
    console.log("Fetching...");
    if (paginatedData && paginatedData.messages.hasMore) {
      await fetchMore({
        variables: {
          cursor: paginatedData.messages.result[0].createdAt,
        },
      });
      setIsFetching(false);
      console.log("Data received.");
    }
  }

  const {
    scrollRef,
    isFetching,
    setIsFetching,
    scrollToBottom,
  } = useMessageScroll(fetchMoreMessages);

  useEffect(() => {
    if (data && data.newMessages) {
      const newMessage = data.newMessages;
      if (messages.filter((m) => m.id === newMessage.id).length === 0) {
        setMessages([...messages, newMessage]);
      }
    }
  }, [data]);

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
        ref={scrollRef}
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
