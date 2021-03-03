import { Flex, Text } from "@primer/components";
import { Message, NewMessagesSubscription } from "../generated/graphql";

interface MessageProps {
  message: NonNullable<NewMessagesSubscription["newMessages"]>;
}

const MessageBox: React.FC<MessageProps> = ({ message }) => {
  return (
    <Flex>
      <Text>{message.user.username}</Text>
      <Text>{message.text}</Text>
    </Flex>
  );
};

export default MessageBox;
