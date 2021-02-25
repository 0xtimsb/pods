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
  CounterLabel,
} from "@primer/components";
import { gql } from "@apollo/client";
import { RiBookMarkLine, RiCloseLine } from "react-icons/ri";
import { FiSmile } from "react-icons/fi";

// Graphql
import {
  MeQuery,
  PodFragment,
  useCreatePodMutation,
  User,
  UserFragment,
} from "../../generated/graphql";

// Routes
import { POD } from "../../constants/routes";

import Container from "../../components/Container";
import mainOptions from "../../constants/mainOptions";
import { MortarBoardIcon, SearchIcon } from "@primer/octicons-react";

interface HomeProps extends RouteComponentProps {
  me: MeQuery["me"];
}

const Home: React.FC<HomeProps> = ({ me, location }) => {
  const pods = me?.pods ?? [];

  const [filterText, setFilterText] = useState("");

  // Modal
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [createPodMutation] = useCreatePodMutation();

  const handleCreatePod = async () => {
    await createPodMutation({
      variables: { name: text },
      update: (cache, { data }) => {
        cache.modify({
          id: cache.identify(me as User),
          fields: {
            pods(existingPodsRefs: any[]) {
              console.log(existingPodsRefs);
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
    setModal(false);
  };

  const handleCancelCreatePod = () => {
    setModal(false);
  };

  const getFilteredList = () => {
    return pods
      .filter(({ name }) =>
        name.toLowerCase().includes(filterText.toLowerCase())
      )
      .map(({ id, name }) => (
        <BorderBox key={id} padding={3}>
          <Flex mb={1}>
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
          <Flex mb={1}>
            <Text fontSize={1} color="gray.7">
              This is some nice info about pod!
            </Text>
          </Flex>
        </BorderBox>
      ));
  };

  return (
    <Box>
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
        <Box flex={1}>
          <Flex py={3}>
            <TextInput
              icon={SearchIcon}
              aria-label="Zipcode"
              placeholder="Find a pod..."
              width={1}
              mr={3}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <ButtonPrimary>New</ButtonPrimary>
          </Flex>
          {pods.length !== getFilteredList().length && (
            <Box mb={3}>
              <Text fontSize={1}>
                <Text fontWeight="bold">{getFilteredList().length}</Text>
                <Text> result for pods matching </Text>
                <Text fontWeight="bold">{filterText}</Text>
              </Text>
            </Box>
          )}
          <Grid gridTemplateColumns="1fr 1fr" gridGap={3}>
            {getFilteredList()}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
