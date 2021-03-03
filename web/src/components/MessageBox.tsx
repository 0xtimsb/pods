import { BorderBox, Box, Flex, Text } from "@primer/components";
import { ImageIcon } from "@primer/octicons-react";
import { NewMessagesSubscription } from "../generated/graphql";
import { currentDate } from "../utils/date";
import Profile from "../images/profile.png";

interface MessageProps {
  message: NonNullable<NewMessagesSubscription["newMessages"]>;
}

const MessageBox: React.FC<MessageProps> = ({ message }) => {
  return (
    <BorderBox
      p={2}
      borderWidth={0}
      borderRadius={0}
      borderTopWidth={1}
      bg="white"
      display="flex"
    >
      <Box marginRight={2}>
        <img
          src={Profile}
          alt={message.user.username}
          width={40}
          height={40}
          style={{ borderRadius: 2 }}
        />
      </Box>
      <Box>
        <Flex alignItems="baseline">
          <Text fontWeight="bold" fontSize={1} mr={1}>
            {message.user.username}
          </Text>
          <Text fontSize="12px" color="gray.7">
            {currentDate(message.createdAt)}
          </Text>
        </Flex>
        <Text fontSize={1}>{message.text}</Text>
      </Box>
    </BorderBox>
  );
};

export default MessageBox;
