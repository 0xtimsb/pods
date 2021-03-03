import { BorderBox, Flex, Text } from "@primer/components";
import { Message, NewMessagesSubscription } from "../generated/graphql";

interface MessageProps {
  message: NonNullable<NewMessagesSubscription["newMessages"]>;
}

const MessageBox: React.FC<MessageProps> = ({ message }) => {
  return (
    <BorderBox
      py={2}
      px={3}
      borderWidth={0}
      borderRadius={0}
      borderTopWidth={1}
      bg="white"
    >
      <Flex>
        <Text fontWeight="bold" fontSize={1}>
          {message.user.username}
        </Text>
      </Flex>
      <Text fontSize={1}>{message.text}</Text>
    </BorderBox>
  );
};

export default MessageBox;
