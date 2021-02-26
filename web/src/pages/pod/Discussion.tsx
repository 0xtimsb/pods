import {
  BorderBox,
  Box,
  Button,
  ButtonPrimary,
  Dialog,
  Dropdown,
  Flex,
  Heading,
  SelectMenu,
  StyledOcticon,
  Text,
  TextInput,
} from "@primer/components";
import { KebabHorizontalIcon } from "@primer/octicons-react";
import { useState } from "react";

// Container
import Container from "../../components/Container";

// Graphql
import { Pod, useInviteToPodMutation } from "../../generated/graphql";

// Hooks
import useInputAndCheckModal from "../../hooks/useInputAndCheckModal";

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

  const [popover, setPopover] = useState(false);

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
            <Button mr={2} onClick={handleClose}>
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
        <BorderBox mb={3}>
          <Box px={3} py={2} bg="gray.0">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading fontSize={1}>Admins</Heading>
              <StyledOcticon icon={KebabHorizontalIcon} />
            </Flex>
          </Box>
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
          <Box px={3} py={2} bg="gray.0">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading fontSize={1}>Members</Heading>
              <StyledOcticon icon={KebabHorizontalIcon} />
            </Flex>
          </Box>
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
        <Button width={1} mb={3} {...buttonProps}>
          Invite
        </Button>
      </Box>
      <Box flex={1} pt={3} mb={6}></Box>
    </Container>
  );
};

export default Discussion;
