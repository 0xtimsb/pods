import { RouteComponentProps } from "react-router-dom";
import { Box } from "@primer/components";
import { gql } from "@apollo/client";

// Graphql
import { MeQuery, useCreatePodMutation, User } from "../generated/graphql";

// Hooks
import useModal from "../hooks/useModal";

// Components
import Container from "../components/Container";
import Modal from "../components/Modal";
import Pods from "../components/home/Pods";
import Invites from "../components/home/Invites";
import HomeTabNav from "../components/home/HomeTabNav";
import HomeUnderlineNav from "../components/home/HomeUnderlineNav";

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
      <HomeUnderlineNav />
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
