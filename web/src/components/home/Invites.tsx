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
  useJoinPodMutation,
  User,
  useUninviteToPodMutation,
} from "../../generated/graphql";

interface InvitesProps {
  me: MeQuery["me"];
}
const Invites: React.FC<InvitesProps> = ({ me }) => {
  const [cancelInviteMutation] = useCancelInviteMutation();
  const [joinPodMutation] = useJoinPodMutation();
  const [uninviteToPodMutation] = useUninviteToPodMutation();

  if (!me) return null;

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

  const handleJoinPod = (podId: number) => {
    joinPodMutation({
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
            pods(existingPodsRefs: Reference[], { readField }) {
              const newPodRef = cache.readFragment({
                id: "Pod:" + podId,
                fragment: gql`
                  fragment NewPod on Pod {
                    id
                    name
                  }
                `,
              });
              return [newPodRef, ...existingPodsRefs];
            },
          },
        });
      },
    });
  };

  const handleUninviteToPod = (username: string, podId: number) => {
    uninviteToPodMutation({
      variables: { username, podId },
      update: (cache) => {
        cache.modify({
          id: cache.identify(me as User),
          fields: {
            sentInvites(existingInvitesRefs: Reference[], { readField }) {
              return existingInvitesRefs.filter((inviteRef) => {
                return !(
                  readField("id", readField("pod", inviteRef)) === podId &&
                  readField("username", readField("invitee", inviteRef)) ===
                    username
                );
              });
            },
          },
        });
      },
    });
  };

  const receivedInvites = me.receivedInvites.map(
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
            <ButtonPrimary onClick={() => handleJoinPod(pod.id)}>
              Accept
            </ButtonPrimary>
          </Flex>
        </Flex>
      </BorderBox>
    )
  );

  const sentInvites = me.sentInvites.map(
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
          <ButtonDanger
            onClick={() => handleUninviteToPod(invitee.username, pod.id)}
          >
            Revert
          </ButtonDanger>
        </Flex>
      </BorderBox>
    )
  );

  return (
    <>
      <BorderBox mb={3} overflow="hidden">
        <Box bg="gray.0" p={3}>
          <Text fontSize={1} fontWeight="bold">
            Received
          </Text>
        </Box>
        {receivedInvites.length === 0 ? (
          <BorderBox p={3} borderRadius={0} borderWidth={0} borderTopWidth={1}>
            <Text fontSize={1} color="gray.5">
              You haven't received any invites yet.
            </Text>
          </BorderBox>
        ) : (
          receivedInvites
        )}
      </BorderBox>
      <BorderBox overflow="hidden">
        <Box bg="gray.0" p={3}>
          <Text fontSize={1} fontWeight="bold">
            Sent
          </Text>
        </Box>
        {sentInvites.length === 0 ? (
          <BorderBox p={3} borderRadius={0} borderWidth={0} borderTopWidth={1}>
            <Text fontSize={1} color="gray.5">
              You haven't sent any invites yet.
            </Text>
          </BorderBox>
        ) : (
          sentInvites
        )}
      </BorderBox>
    </>
  );
};

export default Invites;
