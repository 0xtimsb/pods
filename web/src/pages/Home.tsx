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
  Heading,
} from "@primer/components";
import { gql } from "@apollo/client";

// Graphql
import {
  MeQuery,
  PodFragment,
  useCreatePodMutation,
  User,
  UserFragment,
} from "../generated/graphql";

// Routes
import { POD } from "../constants/routes";

import Container from "../components/Container";
import mainOptions from "../constants/mainOptions";
import {
  CrossReferenceIcon,
  MortarBoardIcon,
  SearchIcon,
  XIcon,
} from "@primer/octicons-react";

interface HomeProps extends RouteComponentProps {
  me: MeQuery["me"];
}

const Home: React.FC<HomeProps> = ({ me, location }) => {
  const pods = me?.pods ?? [];

  // Filter pods
  const [filterText, setFilterText] = useState("");

  // To create pod
  const [newPodText, setNewPodText] = useState("");
  const [createPodMutation] = useCreatePodMutation();

  // For modal
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusRef = useRef(null);

  // Section
  const [section, setSection] = useState<"first" | "second">("first");

  const handleCreatePod = () => {
    createPodMutation({
      variables: { name: newPodText },
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
    setIsOpen(false);
    setNewPodText("");
  };

  const handleCancelNewPod = () => {
    setIsOpen(false);
    setNewPodText("");
  };

  const filteredList = pods
    .filter(
      ({ name, joined }) =>
        joined && name.toLowerCase().includes(filterText.toLowerCase())
    )
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

  const invites = pods
    .filter(({ joined }) => !joined)
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

  return (
    <Box>
      <Dialog
        isOpen={isOpen}
        returnFocusRef={returnFocusRef}
        onDismiss={handleCancelNewPod}
        aria-labelledby="label"
      >
        <Dialog.Header>Create New Pod</Dialog.Header>
        <Box p={3}>
          <TextInput
            placeholder="Enter pod name"
            width={1}
            onChange={(e) => setNewPodText(e.target.value)}
            value={newPodText}
          />
          <Flex mt={3} justifyContent="flex-end">
            <Button mr={1} onClick={handleCancelNewPod}>
              Cancel
            </Button>
            <ButtonPrimary onClick={handleCreatePod}>Create</ButtonPrimary>
          </Flex>
        </Box>
      </Dialog>
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
                <ButtonPrimary
                  ref={returnFocusRef}
                  onClick={() => setIsOpen(true)}
                >
                  New
                </ButtonPrimary>
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
              <Heading fontSize={2}>Received</Heading>
              {invites.length === 0 && <Text>Nope</Text>}
              <Box>{invites}</Box>
              <Heading fontSize={2}>Sent</Heading>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
