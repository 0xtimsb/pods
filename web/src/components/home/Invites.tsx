import { gql, Reference } from "@apollo/client";
import {
  BorderBox,
  Box,
  ButtonDanger,
  ButtonPrimary,
  Flex,
  Text,
} from "@primer/components";

import {
  MeQuery,
  Pod,
  useCancelInviteMutation,
  User,
} from "../../generated/graphql";

interface InvitesProps {
  me: MeQuery["me"];
}
const Invites: React.FC<InvitesProps> = ({ me }) => {
  const [cancelInviteMutation] = useCancelInviteMutation();

  const handleCancelInvite = (podId: number) => {
    cancelInviteMutation({
      variables: { podId },
      update: (cache) => {
        cache.modify({
          id: cache.identify(me as User),
          fields: {
            receivedInvites(existingInvitesRefs: Reference[], { readField }) {
              return existingInvitesRefs.filter((inviteRef) => {
                return readField("id", readField("pod", inviteRef)) !== podId;
              });
            },
          },
        });
      },
    });
  };

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
            <ButtonDanger mr={2} onClick={() => handleCancelInvite(pod.id)}>
              Cancel
            </ButtonDanger>
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
