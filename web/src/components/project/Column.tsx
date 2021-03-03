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
  Pod,
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
  pod: {
    __typename?: "Pod" | undefined;
  } & Pick<Pod, "id" | "name"> & {
      stories: ({
        __typename?: "Story" | undefined;
      } & Pick<Story, "title" | "id"> & {
          tasks: ({
            __typename?: "Task" | undefined;
          } & Pick<Task, "title" | "id">)[];
        })[];
    };
  story: {
    __typename?: "Story" | undefined;
  } & Pick<Story, "title" | "id"> & {
      tasks: ({
        __typename?: "Task" | undefined;
      } & Pick<Task, "title" | "id">)[];
    };
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
      variables: { storyId: story.id, title: text },
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
          width={300}
          marginRight={3}
          flexDirection="column"
          bg="gray.1"
          px={2}
          className={`${snapshot.isDragging && "ring border-blue-500"}`}
        >
          <Flex
            {...provided.dragHandleProps}
            py={3}
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
          {modal && (
            <>
              <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
              <div className="w-96 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg z-30 overflow-hidden">
                <div className="p-5 flex items-center justify-between bg-gray-100 border-b">
                  <div className="text-sm font-medium">{`Delete ${story.title}`}</div>
                  <RiCloseLine className="cursor-pointer text-lg" />
                </div>
                <div className="flex flex-col p-5 bg-white gap-4">
                  <div className="text-sm">
                    This action will remove any tasks associated with the story.
                  </div>
                  <div className="flex gap-2 h-8 text-sm">
                    <button
                      className="flex-1 text-white bg-red-500 border border-red-600 rounded-md font-medium shadow-sm hover:bg-red-600  focus:ring focus:ring-red-500 focus:ring-opacity-40 focus:outline-none disabled:opacity-50 disabled:cursor-default"
                      onClick={handleDeleteStory}
                    >
                      Delete
                    </button>
                    <button
                      className="flex-1 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none"
                      onClick={handleCancelDeleteStory}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          {toggleAdd && (
            <Flex flexDirection="column" mb={2}>
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
          <div className="relative">
            {toggleMenu && (
              <div
                className="absolute right-3 -top-2 z-10 py-1 border rounded shadow-md border-gray-300 bg-white text-sm"
                ref={menuRef}
              >
                <div className="px-3 py-1.5 cursor-pointer hover:bg-gray-100">
                  Rename Story
                </div>
                <div
                  className="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
                  onClick={handleDeleteStoryModal}
                >
                  Delete Story
                </div>
              </div>
            )}
          </div>
          <Droppable droppableId={"S" + story.id} type="tasks">
            {(provided, snapshot) => (
              <Flex ref={provided.innerRef} flexDirection="column">
                {story.tasks.map((task, index) => (
                  <Card key={task.id} task={task} story={story} index={index} />
                ))}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </BorderBox>
      )}
    </Draggable>
  );
};

export default Column;
