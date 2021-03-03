import { Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsCardText } from "react-icons/bs";

// Graphql
import { Story, Task, useDeleteTaskMutation } from "../../generated/graphql";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { BorderBox, Flex, Heading, Text } from "@primer/components";

interface CardProps {
  story: {
    __typename?: "Story" | undefined;
  } & Pick<Story, "title" | "id"> & {
      tasks: ({
        __typename?: "Task" | undefined;
      } & Pick<Task, "title" | "id">)[];
    };
  task: {
    __typename?: "Task" | undefined;
  } & Pick<Task, "title" | "id">;
  index: number;
}

const Card: React.FC<CardProps> = ({ task, story, index }) => {
  // Menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modal
  const [modal, setModal] = useState(false);
  const [deleteTaskMutation] = useDeleteTaskMutation();

  useOutsideClick(menuRef, () => {
    if (toggleMenu) setToggleMenu(false);
  });

  const handleDeleteTaskModal = () => {
    setToggleMenu(false);
    setModal(true);
  };

  const handleDeleteTask = async () => {
    await deleteTaskMutation({
      variables: { taskId: task.id },
      update: (cache, { data }) => {
        if (data && data.deleteTask) {
          cache.modify({
            id: cache.identify(story),
            fields: {
              tasks(existingTasksRefs: any[], { readField }) {
                return existingTasksRefs.filter(
                  (taskRef) => readField("id", taskRef) !== task.id
                );
              },
            },
          });
        }
      },
    });
    setModal(false);
  };

  const handleCancelDeleteTask = () => {
    setModal(false);
  };

  return (
    <Draggable key={task.id} draggableId={"T" + task.id} index={index}>
      {(provided, snapshot) => (
        <BorderBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          bg="white"
          boxShadow="0px 1px 0px 0px rgba(0, 0, 0, 0.05)"
          py="10px"
          px="12px"
          mb={2}
        >
          <Flex justifyContent="space-between">
            <Heading fontSize={1}>{task.title}</Heading>
            <FiMoreHorizontal
              className="text-lg text-gray-500 cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          </Flex>
          {modal && (
            <>
              <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
              <div className="w-96 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg z-30 overflow-hidden">
                <div className="p-5 flex items-center justify-between bg-gray-100 border-b">
                  <div className="text-sm font-medium">{`Delete ${task.title}`}</div>
                  <RiCloseLine className="cursor-pointer text-lg" />
                </div>
                <div className="flex flex-col p-5 bg-white gap-4">
                  <div className="text-sm">
                    This action will unassign any users assigned to the task.
                  </div>
                  <div className="flex gap-2 h-8 text-sm">
                    <button
                      className="flex-1 text-white bg-red-500 border border-red-600 rounded-md font-medium shadow-sm hover:bg-red-600  focus:ring focus:ring-red-500 focus:ring-opacity-40 focus:outline-none disabled:opacity-50 disabled:cursor-default"
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </button>
                    <button
                      className="flex-1 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none"
                      onClick={handleCancelDeleteTask}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="relative">
            {toggleMenu && (
              <div
                className="absolute right-3 -top-2 z-10 py-1 border rounded shadow-md border-gray-300 bg-white text-sm"
                ref={menuRef}
              >
                <div className="px-3 py-1.5 cursor-pointer hover:bg-gray-100">
                  Assign User
                </div>
                <div className="px-3 py-1.5 cursor-pointer hover:bg-gray-100">
                  Rename Task
                </div>
                <div
                  className="px-3 py-1.5 cursor-pointer hover:bg-gray-100"
                  onClick={handleDeleteTaskModal}
                >
                  Delete Task
                </div>
              </div>
            )}
          </div>
          <Text fontSize="12px">
            <Text>Added by </Text>
            <Text fontWeight="bold">smitbarmase</Text>
          </Text>
        </BorderBox>
      )}
    </Draggable>
  );
};

export default Card;
