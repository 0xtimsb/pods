import {
  Box,
  Button,
  ButtonPrimary,
  Dialog,
  Dropdown,
  Flex,
  Heading,
  TextInput,
} from "@primer/components";

import Container from "../../components/Container";

import { Pod, useInviteToPodMutation } from "../../generated/graphql";
import useInputAndCheckModal from "../../hooks/useInputAndCheckModal";
import useInputModal from "../../hooks/useInputModal";

const Discussion = ({ pod }: { pod: Pod }) => {
  const [inviteToPod] = useInviteToPodMutation();

  const {
    check,
    setCheck,
    value,
    dialogProps,
    inputProps,
    buttonProps,
    handleClose,
  } = useInputAndCheckModal();

  const handleInviteUser = () => {
    inviteToPod({
      variables: { username: value, podId: pod.id, asAdmin: check },
    });
  };

  return (
    <Container>
      <Dialog {...dialogProps} onDismiss={handleClose} aria-labelledby="label">
        <Dialog.Header>Invite user to the pod</Dialog.Header>
        <Box p={3}>
          <Flex>
            <TextInput
              placeholder="Enter Username"
              width={1}
              {...inputProps}
              mr={2}
            />
            <Dropdown>
              <Dropdown.Button>{check ? "Admin" : "Member"}</Dropdown.Button>
              <Dropdown.Menu direction="sw">
                <Dropdown.Item onClick={() => setCheck(false)}>
                  Member
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setCheck(true)}>
                  Admin
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Flex>
          <Flex mt={3} justifyContent="flex-end">
            <Button mr={1} onClick={handleClose}>
              Cancel
            </Button>
            <ButtonPrimary onClick={handleInviteUser}>Invite</ButtonPrimary>
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
