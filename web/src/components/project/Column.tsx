import { gql } from "@apollo/client";
import {
  BorderBox,
  Box,
  Button,
  ButtonPrimary,
  CounterLabel,
  Dialog,
  Flex,
  Heading,
  TextInput,
} from "@primer/components";
import { useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FiPlus, FiMoreHorizontal } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

// Graphql
import {
  PodQuery,
  Story,
  Task,
  useCreateTaskMutation,
  useDeleteStoryMutation,
} from "../../generated/graphql";
import useInputModal from "../../hooks/useInputModal";
import useOutsideClick from "../../hooks/useOutsideClick";

// Components
import Card from "./Card";

interface ColumnProps {
  pod: NonNullable<PodQuery["pod"]>;
  story: NonNullable<PodQuery["pod"]>["stories"][0];
  index: number;
}

const Column: React.FC<ColumnProps> = ({ pod, story, index }) => {
  // Add Task
  const [createTaskMutation] = useCreateTaskMutation();
  const {
    value,
    dialogProps,
    inputProps,
    buttonProps,
    handleClose,
  } = useInputModal();

  const [toggleAdd, setToggleAdd] = useState(false);
  const [text, setText] = useState("");

  // Menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modal
  const [modal, setModal] = useState(false);
  const [deleteStoryMutation] = useDeleteStoryMutation();

  useOutsideClick(menuRef, () => {
    if (toggleMenu) setToggleMenu(false);
  });

  const handleCreateTask = async () => {
    await createTaskMutation({
      variables: { storyId: story.id, title: text, description: "" },
      update: (cache, { data }) => {
        if (data && data.createTask.task) {
          cache.modify({
            id: cache.identify(story),
            fields: {
              tasks(existingTaskRefs) {
                const newTaskRef = cache.writeFragment({
                  data: data.createTask.task,
                  fragment: gql`
                    fragment NewTask on Task {
                      id
                      title
                    }
                  `,
                });
                return [newTaskRef, ...existingTaskRefs];
              },
            },
          });
        }
      },
    });
    setToggleAdd(false);
    setText("");
  };

  const handleCancelAddTask = () => {
    setToggleAdd(false);
    setText("");
  };

  const handleDeleteStoryModal = () => {
    setToggleMenu(false);
    setModal(true);
  };

  const handleDeleteStory = async () => {
    await deleteStoryMutation({
      variables: { storyId: story.id },
      update: (cache, { data }) => {
        if (data && data.deleteStory) {
          cache.modify({
            id: cache.identify(pod),
            fields: {
              stories(existingStoriesRefs: any[], { readField }) {
                return existingStoriesRefs.filter(
                  (storyRef) => readField("id", storyRef) !== story.id
                );
              },
            },
          });
        }
      },
    });
    setModal(false);
  };

  const handleCancelDeleteStory = () => {
    setModal(false);
  };

  return (
    <Draggable key={story.id} draggableId={"S" + story.id} index={index}>
      {(provided, snapshot) => (
        <BorderBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          minWidth={320}
          marginRight={3}
          bg="gray.1"
          display="flex"
          flexDirection="column"
        >
          <Flex
            {...provided.dragHandleProps}
            py={3}
            px={2}
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <CounterLabel mr={2} px={2} py={1}>
                {story.tasks.length}
              </CounterLabel>
              <Heading fontSize={1}>{story.title}</Heading>
            </Flex>
            <Flex alignItems="center">
              <FiPlus cursor="pointer" onClick={() => setToggleAdd(true)} />
              <FiMoreHorizontal
                cursor="pointer"
                onClick={() => setToggleAdd(true)}
              />
            </Flex>
          </Flex>
          {toggleAdd && (
            <Flex flexDirection="column" mb={2} mx={2}>
              <TextInput
                placeholder="Enter your task"
                autoFocus={true}
                onChange={(e) => setText(e.target.value)}
                mb={2}
                bg="white"
                as="textarea"
                style={{ resize: "vertical" }}
              />
              <Flex>
                <ButtonPrimary
                  onClick={handleCreateTask}
                  disabled={text === ""}
                  mr={2}
                  width="100%"
                >
                  Add
                </ButtonPrimary>
                <Button width="100%" onClick={handleCancelAddTask}>
                  Cancel
                </Button>
              </Flex>
            </Flex>
          )}
          <Droppable droppableId={"S" + story.id} type="tasks">
            {(provided, snapshot) => (
              <Box ref={provided.innerRef} overflowY="auto" flex={1} px={2}>
                {story.tasks.map((task, index) => (
                  <Card
                    key={task.id}
                    pod={pod}
                    task={task}
                    story={story}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </BorderBox>
      )}
    </Draggable>
  );
};

export default Column;
