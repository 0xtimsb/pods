import {
  BorderBox,
  Box,
  Button,
  ButtonPrimary,
  CounterLabel,
  Dialog,
  Dropdown,
  Flex,
  Heading,
  StyledOcticon,
  Text,
  TextInput,
} from "@primer/components";
import { KebabHorizontalIcon } from "@primer/octicons-react";

// Container
import Container from "../../components/Container";
import MessageBox from "../../components/MessageBox";
import MessagePanel from "../../components/MessagePanel";

// Graphql
import {
  MeQuery,
  Pod,
  useInviteToPodMutation,
  useNewMessagesSubscription,
} from "../../generated/graphql";

// Hooks
import useInputAndCheckModal from "../../hooks/useInputAndCheckModal";

const Discussion = ({
  me,
  pod,
}: {
  me: NonNullable<MeQuery["me"]>;
  pod: Pod;
}) => {
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
    <Container py={3}>
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
            <Button mr={2} onClick={handleClose}>
              Cancel
            </Button>
            <ButtonPrimary onClick={handleInviteUser}>Invite</ButtonPrimary>
          </Flex>
        </Box>
      </Dialog>
      <Box width={270} py={3} mr={3}>
        <Heading fontSize={3} mb={3}>
          {pod.name}
        </Heading>
        <BorderBox mb={3}>
          <Flex p={2} bg="gray.0">
            <CounterLabel mr={2} px={2} py={1}>
              {pod.admins.length}
            </CounterLabel>
            <Heading fontSize={1}>Admins</Heading>
          </Flex>
          {pod.admins.map((admin) => (
            <BorderBox
              px={3}
              py={2}
              borderRadius={0}
              borderWidth={0}
              borderTopWidth={1}
            >
              <Text fontSize={1}>{admin.username}</Text>
            </BorderBox>
          ))}
        </BorderBox>
        <BorderBox mb={3}>
          <Flex p={2} bg="gray.0">
            <CounterLabel mr={2} px={2} py={1}>
              {pod.members.length}
            </CounterLabel>
            <Heading fontSize={1}>Members</Heading>
          </Flex>
          {pod.members.map((member) => (
            <BorderBox
              px={3}
              py={2}
              borderRadius={0}
              borderWidth={0}
              borderTopWidth={1}
            >
              <Text fontSize={1}>{member.username}</Text>
            </BorderBox>
          ))}
        </BorderBox>
        {pod.admins.find((admin) => admin.username === me.username) && (
          <Button width={1} mb={3} {...buttonProps}>
            Invite
          </Button>
        )}
      </Box>
      <MessagePanel podId={pod.id} />
    </Container>
  );
};

export default Discussion;
