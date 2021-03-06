import {
  Box,
  Button,
  ButtonPrimary,
  Dialog,
  Flex,
  Heading,
  TextInput,
  Text,
  BorderBox,
} from "@primer/components";
import { gql, Reference } from "@apollo/client";

// Graphql
import { MeQuery, useCreatePodMutation, User } from "../generated/graphql";

// Hooks
import useInputModal from "../hooks/useInputModal";

// Components
import Layout from "../components/Layout";
import Container from "../components/Container";
import Pods from "../components/home/Pods";
import Invites from "../components/home/Invites";
import UnderlineNavbar from "../components/UnderlineNavbar";

// Constants
import { homeNavItems } from "../constants/navItems";

// Image
import Profile from "../images/profile.png";
import { currentDate, timeAgo } from "../utils/date";

interface HomeProps {
  me: NonNullable<MeQuery["me"]>;
}

const Home: React.FC<HomeProps> = ({ me }) => {
  const [createPodMutation] = useCreatePodMutation();

  const {
    value,
    dialogProps,
    inputProps,
    buttonProps,
    handleClose,
  } = useInputModal();

  const handleCreatePod = () => {
    createPodMutation({
      variables: { name: value },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify(me as User),
          fields: {
            pods(existingPodsRefs: Reference[]) {
              const newPodRef = cache.writeFragment({
                fragment: gql`
                  fragment NewPod on Pod {
                    id
                    name
                    joined
                    createdAt
                  }
                `,
                data: data!.createPod.pod,
              });
              return [newPodRef, ...existingPodsRefs];
            },
          },
        });
      },
    });
    handleClose();
  };

  return (
    <Layout>
      <UnderlineNavbar me={me} navItems={homeNavItems} />
      <Dialog {...dialogProps} onDismiss={handleClose} aria-labelledby="label">
        <Dialog.Header>Create New Pod</Dialog.Header>
        <Box p={3}>
          <TextInput placeholder="Name" width={1} mb={2} {...inputProps} />
          <Flex mt={3} justifyContent="flex-end">
            <Button mr={2} onClick={handleClose}>
              Cancel
            </Button>
            <ButtonPrimary onClick={handleCreatePod}>Create</ButtonPrimary>
          </Flex>
        </Box>
      </Dialog>
      <Container flexDirection="row" pt={3}>
        <Box flex={1} mr={3}>
          <Heading fontSize={2} mb={3}>
            Profile
          </Heading>
          <BorderBox mb={3} overflow="hidden">
            <Flex bg="gray.0" p={3} alignItems="center">
              <img
                src={Profile}
                alt={me.username}
                width={70}
                height={70}
                style={{ borderRadius: 4 }}
              />
              <Heading ml={3}>{me.username}</Heading>
            </Flex>
            <BorderBox
              p={3}
              borderRadius={0}
              borderWidth={0}
              borderTopWidth={1}
            >
              <Flex mb={1}>
                <Text fontSize={1} mr={1} color="gray.6">
                  Joined
                </Text>
                <Text fontSize={1} color="gray.7" fontWeight="bold">
                  {currentDate(me.createdAt)}
                </Text>
              </Flex>
              <Flex mb={1}>
                <Text fontSize={1} mr={1} color="gray.6">
                  Admin of
                </Text>
                <Text fontSize={1} color="gray.7" fontWeight="bold">
                  {me.pods.reduce(
                    (prev, curr) => prev + (curr.isAdmin ? 1 : 0),
                    0
                  )}
                </Text>
              </Flex>
              <Flex>
                <Text fontSize={1} mr={1} color="gray.6">
                  Member of
                </Text>
                <Text fontSize={1} color="gray.7" fontWeight="bold">
                  {me.pods.reduce(
                    (prev, curr) => prev + (!curr.isAdmin ? 1 : 0),
                    0
                  )}
                </Text>
              </Flex>
            </BorderBox>
          </BorderBox>
          <Heading fontSize={2} mb={3}>
            Invites
          </Heading>
          <Invites me={me} />
        </Box>
        <Box flex={2}>
          <Heading fontSize={2} mb={3}>
            Pods
          </Heading>
          <Pods pods={me.pods} buttonProps={buttonProps} />
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
