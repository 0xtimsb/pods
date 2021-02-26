import {
  Box,
  Button,
  ButtonPrimary,
  Dialog,
  Flex,
  Heading,
  TextInput,
} from "@primer/components";

import Container from "../../components/Container";

import { Pod, useInviteToPodMutation } from "../../generated/graphql";
import useInputModal from "../../hooks/useInputModal";

const Discussion = ({ pod }: { pod: Pod }) => {
  const [inviteToPod] = useInviteToPodMutation();

  const {
    value,
    dialogProps,
    inputProps,
    buttonProps,
    handleClose,
  } = useInputModal();

  const handleInviteUser = () => {
    inviteToPod({
      variables: { username: value, podId: pod.id, asAdmin: false },
    });
  };

  return (
    <Container>
      <Dialog {...dialogProps} onDismiss={handleClose} aria-labelledby="label">
        <Dialog.Header>Create new pod</Dialog.Header>
        <Box p={3}>
          <TextInput placeholder="Enter pod name" width={1} {...inputProps} />
          <Flex mt={3} justifyContent="flex-end">
            <Button mr={1} onClick={handleClose}>
              Cancel
            </Button>
            <ButtonPrimary onClick={handleInviteUser}>Create</ButtonPrimary>
          </Flex>
        </Box>
      </Dialog>
      <Box width={250} py={3}>
        <Heading fontSize={3} mb={3}>
          {pod.name}
        </Heading>
        <Button width={1} {...buttonProps}>
          Invite
        </Button>
      </Box>
      <Box flex={1} pt={3} mb={6}></Box>
    </Container>
  );
};

export default Discussion;
