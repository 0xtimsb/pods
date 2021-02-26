import {
  BorderBox,
  Box,
  ButtonDanger,
  ButtonPrimary,
  Flex,
  Text,
} from "@primer/components";

import { MeQuery } from "../../generated/graphql";

interface InvitesProps {
  me: MeQuery["me"];
}
const Invites: React.FC<InvitesProps> = ({ me }) => {
  const receivedInvites = me?.receivedInvites.map(
    ({ inviter, pod, asAdmin, createdAt }) => (
      <BorderBox
        key={inviter.id}
        p={3}
        borderRadius={0}
        borderWidth={0}
        borderTopWidth={1}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize={1}>
            <Text fontWeight="bold">{inviter.username}</Text>
            <Text> invited you to join </Text>
            <Text fontWeight="bold">{pod.name}</Text>
            <Text> as </Text>
            <Text>{asAdmin ? "admin" : "member"}</Text>
          </Text>
          <Flex>
            <ButtonDanger mr={2}>Cancel</ButtonDanger>
            <ButtonPrimary>Accept</ButtonPrimary>
          </Flex>
        </Flex>
      </BorderBox>
    )
  );

  const sentInvites = me?.sentInvites.map(
    ({ invitee, pod, asAdmin, createdAt }) => (
      <BorderBox
        key={invitee.id}
        p={3}
        borderRadius={0}
        borderWidth={0}
        borderTopWidth={1}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize={1}>
            <Text> You invited </Text>
            <Text fontWeight="bold">{invitee.username}</Text>
            <Text> to join </Text>
            <Text fontWeight="bold">{pod.name}</Text>
            <Text> as </Text>
            <Text>{asAdmin ? "admin." : "member."}</Text>
          </Text>
          <ButtonDanger>Cancel invite</ButtonDanger>
        </Flex>
      </BorderBox>
    )
  );

  return (
    <>
      <BorderBox mb={3} overflow="hidden">
        <Box bg="gray.1" p={3}>
          <Text fontSize={1} fontWeight="bold">
            Received
          </Text>
        </Box>
        {receivedInvites}
      </BorderBox>
      <BorderBox overflow="hidden">
        <Box bg="gray.1" p={3}>
          <Text fontSize={1} fontWeight="bold">
            Sent
          </Text>
        </Box>
        {sentInvites}
      </BorderBox>
    </>
  );
};

export default Invites;
