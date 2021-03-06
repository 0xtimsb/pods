import { gql } from "@apollo/client";
import {
  Box,
  Breadcrumb,
  Button,
  ButtonPrimary,
  Dialog,
  Flex,
  Text,
  TextInput,
} from "@primer/components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { generatePath, NavLink } from "react-router-dom";

// Constants
import { podNavItems } from "../../constants/navItems";
import { HOME, POD } from "../../constants/routes";

// Graphql
import {
  MeQuery,
  PodQuery,
  useCreateStoryMutation,
} from "../../generated/graphql";

// Hooks
import useInputModal from "../../hooks/useInputModal";
import useProject from "../../hooks/useProject";

// Components
import Column from "./Column";
import Container from "../Container";
import UnderlineNavbar from "../UnderlineNavbar";

interface BoardProps {
  me: NonNullable<MeQuery["me"]>;
  pod: NonNullable<PodQuery["pod"]>;
}

const Board: React.FC<BoardProps> = ({ me, pod }) => {
  const [onDragEnd] = useProject(pod);

  const [createStory] = useCreateStoryMutation();

  const {
    value,
    inputProps,
    buttonProps,
    dialogProps,
    handleClose,
  } = useInputModal();

  const handleCreateStory = () => {
    createStory({
      variables: { podId: pod.id, title: value },
      update: (cache, { data }) => {
        if (data && data.createStory) {
          cache.modify({
            id: cache.identify(pod),
            fields: {
              stories(existingStoryRefs) {
                const newStoryRef = cache.writeFragment({
                  data: data.createStory.story,
                  fragment: gql`
                    fragment NewStory on Story {
                      id
                      title
                    }
                  `,
                });
                return [newStoryRef, ...existingStoryRefs];
              },
            },
          });
        }
      },
    });
    handleClose();
  };

  const { stories } = pod;

  return (
    <Container flexDirection="column">
      <UnderlineNavbar me={me} navItems={podNavItems} id={pod.id} />
      <Dialog {...dialogProps} onDismiss={handleClose} aria-labelledby="label">
        <Dialog.Header>Add new story to the pod</Dialog.Header>
        <Box p={3}>
          <TextInput
            width={1}
            placeholder="Enter name of the story"
            {...inputProps}
          />
          <Flex mt={3} justifyContent="flex-end">
            <Button mr={2} onClick={handleClose}>
              Cancel
            </Button>
            <ButtonPrimary onClick={handleCreateStory}>Add Story</ButtonPrimary>
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
        <Button {...buttonProps}>Add Story</Button>
      </Flex>
      <Container pb={3}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="droppable"
            type="stories"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <Flex ref={provided.innerRef} flex={1}>
                {stories.map((story, index) => (
                  <Column
                    key={story.id}
                    pod={pod}
                    story={story}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Container>
  );
};

export default Board;
