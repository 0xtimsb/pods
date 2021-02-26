import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Box,
  Flex,
  StyledOcticon,
  UnderlineNav,
  Text,
  ButtonPrimary,
  Link,
  BorderBox,
  TabNav,
  ButtonInvisible,
  ButtonDanger,
} from "@primer/components";
import { gql } from "@apollo/client";

// Graphql
import { MeQuery, useCreatePodMutation, User } from "../generated/graphql";

import Container from "../components/Container";
import Modal from "../components/Modal";
import mainOptions from "../constants/mainOptions";
import useModal from "../hooks/useModal";
import Pods from "../components/home/Pods";
import Invites from "../components/home/Invites";
import HomeTabNav from "../components/home/HomeTabNav";

interface HomeProps extends RouteComponentProps {
  me: MeQuery["me"];
}

const Home: React.FC<HomeProps> = ({ me, location }) => {
  const [createPodMutation] = useCreatePodMutation();

  const { modalProps, buttonProps } = useModal();

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
          <HomeTabNav
            pods={() => <Pods me={me} buttonProps={buttonProps} />}
            invites={() => <Invites me={me} />}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
