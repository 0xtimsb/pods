import {
  BorderBox,
  ButtonPrimary,
  Flex,
  Text,
  TextInput,
} from "@primer/components";
import { useState } from "react";
import {
  Message,
  NewMessagesSubscription,
  useCreateMessageMutation,
  useNewMessagesSubscription,
} from "../generated/graphql";
import Input from "./common/Input";

interface MessageInputBoxProps {
  podId: number;
}

const MessageInputBox: React.FC<MessageInputBoxProps> = ({ podId }) => {
  const [text, setText] = useState("");
  const [createMessageMutation] = useCreateMessageMutation();

  const handleCreateMessage = async () => {
    await createMessageMutation({ variables: { text, podId } });
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (text.trim().length !== 0) handleCreateMessage();
      e.preventDefault();
    }
  };

  return (
    <BorderBox
      p={2}
      bg="white"
      borderRadius={0}
      borderBottomLeftRadius={2}
      borderBottomRightRadius={2}
    >
      <TextInput
        value={text}
        as="textarea"
        style={{ resize: "vertical" }}
        bg="gray.0"
        placeholder="Write your message (Enter to send. Shift + Enter for new line.)"
        width="100%"
        mb={2}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Flex justifyContent="flex-end">
        <ButtonPrimary
          onClick={handleCreateMessage}
          disabled={text.trim().length === 0}
        >
          Send
        </ButtonPrimary>
      </Flex>
    </BorderBox>
  );
};

export default MessageInputBox;
