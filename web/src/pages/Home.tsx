import { useRef, useState } from "react";
import {
  Link as RouterLink,
  generatePath,
  RouteComponentProps,
} from "react-router-dom";
import {
  Box,
  Flex,
  StyledOcticon,
  UnderlineNav,
  Text,
  ButtonPrimary,
  Link,
  BorderBox,
  TextInput,
  Grid,
  TabNav,
  ButtonInvisible,
  Button,
  Dialog,
  ButtonDanger,
  useDetails,
} from "@primer/components";
import { MortarBoardIcon, SearchIcon, XIcon } from "@primer/octicons-react";
import { gql } from "@apollo/client";

// Graphql
import { MeQuery, useCreatePodMutation, User } from "../generated/graphql";

// Routes
import { POD } from "../constants/routes";

import Container from "../components/Container";
import Modal from "../components/Modal";
import mainOptions from "../constants/mainOptions";
import useModal from "../hooks/useModal";

interface HomeProps extends RouteComponentProps {
  me: MeQuery["me"];
}

const Home: React.FC<HomeProps> = ({ me, location }) => {
  const pods = me?.pods ?? [];

  // Filter pods
  const [filterText, setFilterText] = useState("");

  const [createPodMutation] = useCreatePodMutation();

  const { modalProps, buttonProps } = useModal();

  // Section
  const [section, setSection] = useState<"first" | "second">("first");

  const handleCreatePod = (text: string) => {
    createPodMutation({
      variables: { name: text },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify(me as User),
          fields: {
            pods(existingPodsRefs: any[]) {
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
  };

  const filteredList = pods
    .filter(({ name }) => name.toLowerCase().includes(filterText.toLowerCase()))
    .map(({ id, name }) => (
      <BorderBox key={id} padding={3} height={92}>
        <Flex mb={2} alignItems="center">
          <StyledOcticon icon={MortarBoardIcon} mr={2} />
          <Link
            as={RouterLink}
            to={generatePath(POD, { id })}
            fontWeight="bold"
            fontSize={1}
          >
            {name}
          </Link>
        </Flex>
        <Flex>
          <Text fontSize={1} color="gray.7">
            This is some nice info about pod!
          </Text>
        </Flex>
      </BorderBox>
    ));

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
    <Box>
      <Modal
        title="Create new pod"
        placeholder="Enter pod name"
        submit="Create"
        handleSubmit={handleCreatePod}
        {...modalProps}
      />
      <UnderlineNav bg="gray.0">
        <Container>
          <Flex>
            {mainOptions.map(({ name, route, icon }, index) => (
              <UnderlineNav.Link
                as={Link}
                to={route}
                key={index}
                selected={location.pathname === route}
              >
                <StyledOcticon icon={icon} mr={2} />
                <Text
                  fontWeight={location.pathname === route ? "bold" : "normal"}
                >
                  {name}
                </Text>
              </UnderlineNav.Link>
            ))}
          </Flex>
        </Container>
      </UnderlineNav>
      <Container flexDirection="row">
        <Box width={350}></Box>
        <Box flex={1} pt={3}>
          <TabNav aria-label="Main" mb={3}>
            <TabNav.Link selected={section === "first"}>
              <ButtonInvisible
                color="black"
                onClick={() => setSection("first")}
              >
                Pods
              </ButtonInvisible>
            </TabNav.Link>
            <TabNav.Link selected={section === "second"}>
              <ButtonInvisible
                color="black"
                onClick={() => setSection("second")}
              >
                Invites
              </ButtonInvisible>
            </TabNav.Link>
          </TabNav>
          {section === "first" ? (
            <>
              <Flex mb={3}>
                <TextInput
                  icon={SearchIcon}
                  placeholder="Find a pod..."
                  width={1}
                  mr={3}
                  onChange={(e) => setFilterText(e.target.value)}
                  value={filterText}
                />
                <ButtonPrimary {...buttonProps}>New</ButtonPrimary>
              </Flex>
              {pods.length !== filteredList.length && (
                <Flex mb={3} justifyContent="space-between">
                  <Text fontSize={1}>
                    <Text fontWeight="bold">{filteredList.length}</Text>
                    <Text> result for pods matching </Text>
                    <Text fontWeight="bold">{filterText}</Text>
                  </Text>
                  <ButtonInvisible
                    onClick={() => setFilterText("")}
                    paddingX={0}
                  >
                    <StyledOcticon icon={XIcon} mr={1} />
                    Clear filter
                  </ButtonInvisible>
                </Flex>
              )}
              <Grid gridTemplateColumns="1fr 1fr" gridGap={3} mb={3}>
                {filteredList}
              </Grid>
            </>
          ) : (
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
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
