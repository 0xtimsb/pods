import { BorderBox, Box, Button, Flex } from "@primer/components";
import { useEffect, useState } from "react";
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
  const { data: paginatedData } = useMessagesQuery({
    variables: { podId: pod.id, limit: 10 },
  });

  const [messageLazy, { data: lazyMessages }] = useMessagesLazyQuery();

  const { data, loading } = useNewMessagesSubscription({
    variables: { podId: pod.id },
  });

  const [messages, setMessages] = useState<
    NonNullable<NewMessagesSubscription["newMessages"]>[]
  >([]);

  const handleFetchMore = () => {
    console.log("fetch more");
    if (paginatedData && paginatedData.messages.hasMore) {
      setIsFetching(true);
      messageLazy({
        variables: {
          podId: pod.id,
          limit: 10,
          cursor: paginatedData.messages.result[0].createdAt,
        },
      });
    }
  };

  useEffect(() => {
    if (lazyMessages) {
      console.log(lazyMessages.messages.result);
    }
  }, [lazyMessages]);

  const { isFetching, setIsFetching, scrollWindowRef } = useInfiniteScroll(
    handleFetchMore
  );

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
        ref={scrollWindowRef}
      >
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
        {paginatedData &&
          paginatedData.messages.result.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))}
      </BorderBox>
      <MessageInputBox podId={pod.id} />
    </Flex>
  );
};

export default MessagePanel;
