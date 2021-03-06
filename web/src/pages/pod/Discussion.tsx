import { gql } from "@apollo/client";
import {
  BorderBox,
  Box,
  Breadcrumb,
  Button,
  ButtonPrimary,
  CounterLabel,
  Dialog,
  Dropdown,
  Flex,
  Heading,
  Label,
  Text,
  TextInput,
} from "@primer/components";
import { generatePath, Link, NavLink } from "react-router-dom";

// Container
import Container from "../../components/Container";
import MessagePanel from "../../components/MessagePanel";
import UnderlineNavbar from "../../components/UnderlineNavbar";
import { podNavItems } from "../../constants/navItems";
import { HOME, POD } from "../../constants/routes";

// Graphql
import {
  MeQuery,
  PodQuery,
  useInviteToPodMutation,
} from "../../generated/graphql";

// Hooks
import useInputAndCheckModal from "../../hooks/useInputAndCheckModal";

// Utils
import { currentDate } from "../../utils/date";

// Image
import Profile from "../../images/profile.png";

const Discussion = ({
  me,
  pod,
}: {
  me: NonNullable<MeQuery["me"]>;
  pod: NonNullable<PodQuery["pod"]>;
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
      update: (cache, { data }) => {
        if (data && data.inviteToPod) {
          cache.modify({
            id: cache.identify(me),
            fields: {
              sentInvites(existingInviteRefs) {
                const newInviteRef = cache.writeFragment({
                  data: data.inviteToPod.invite,
                  fragment: gql`
                    fragment NewInvite on Invite {
                      asAdmin
                      createdAt
                      invitee {
                        id
                        username
                      }
                      pod {
                        id
                        name
                      }
                    }
                  `,
                });
                return [newInviteRef, ...existingInviteRefs];
              },
            },
          });
        }
      },
    });
    handleClose();
  };

  return (
    <Container flexDirection="column">
      <UnderlineNavbar me={me} navItems={podNavItems} id={pod.id} />
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
      <Flex py={3} justifyContent="space-between">
        <Breadcrumb>
          <Breadcrumb.Item
            as={(props) => <NavLink exact {...props} />}
            to={HOME}
          >
            <Text fontSize={2} fontWeight="bold">
              Home
            </Text>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            as={(props) => <NavLink exact {...props} />}
            to={generatePath(POD, { id: pod.id })}
          >
            <Text fontSize={2} fontWeight="bold">
              {pod.name}
            </Text>
          </Breadcrumb.Item>
        </Breadcrumb>
        {pod.isAdmin && <Button {...buttonProps}>Invite</Button>}
      </Flex>
      <Container pb={3}>
        <Flex flexDirection="column" width={275} mr={3}>
          <BorderBox mb={3} overflow="hidden">
            <Box bg="gray.0" p={3}>
              <Heading>{pod.name}</Heading>
              <Label variant="large" bg="#656BFE" mt={3}>
                You are {pod.isAdmin ? "Admin" : "Member"}
              </Label>
            </Box>
            <BorderBox
              p={3}
              borderRadius={0}
              borderWidth={0}
              borderTopWidth={1}
            >
              <Flex mb={1}>
                <Text fontSize={1} mr={1} color="gray.6">
                  Created at
                </Text>
                <Text fontSize={1} color="gray.7" fontWeight="bold">
                  {currentDate(pod.createdAt)}
                </Text>
              </Flex>
              <Flex mb={1}>
                <Text fontSize={1} mr={1} color="gray.6">
                  Stories created
                </Text>
                <Text fontSize={1} color="gray.7" fontWeight="bold">
                  {pod.stories.length}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize={1} mr={1} color="gray.6">
                  Tasks working on
                </Text>
                <Text fontSize={1} color="gray.7" fontWeight="bold">
                  {pod.stories.reduce(
                    (prev, curr) => curr.tasks.length + prev,
                    0
                  )}
                </Text>
              </Flex>
            </BorderBox>
          </BorderBox>
          <BorderBox mb={3}>
            <Flex p={2} bg="gray.0">
              <CounterLabel mr={2} px={2} py={1}>
                {pod.admins.length}
              </CounterLabel>
              <Heading fontSize={1}>Admins</Heading>
            </Flex>
            {pod.admins.map((admin) => (
              <BorderBox
                as={Flex}
                key={admin.id}
                px={3}
                py={2}
                borderRadius={0}
                borderWidth={0}
                borderTopWidth={1}
                alignItems="center"
              >
                <img
                  src={Profile}
                  alt={me.username}
                  width={20}
                  height={20}
                  style={{ borderRadius: 4 }}
                />
                <Heading fontSize={1} ml={2}>
                  {admin.username}
                </Heading>
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
                as={Flex}
                key={member.id}
                px={3}
                py={2}
                borderRadius={0}
                borderWidth={0}
                borderTopWidth={1}
                alignItems="center"
              >
                <img
                  src={Profile}
                  alt={me.username}
                  width={20}
                  height={20}
                  style={{ borderRadius: 4 }}
                />
                <Heading fontSize={1} ml={2}>
                  {member.username}
                </Heading>
              </BorderBox>
            ))}
          </BorderBox>
        </Flex>
        <MessagePanel pod={pod} />
      </Container>
    </Container>
  );
};

export default Discussion;
