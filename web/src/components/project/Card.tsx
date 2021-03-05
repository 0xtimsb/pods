import { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import {
  BorderBox,
  Flex,
  Heading,
  Label,
  SelectMenu,
  Text,
} from "@primer/components";

// Graphql
import {
  Pod,
  PodQuery,
  Story,
  Task,
  useAssignUserToTaskMutation,
  useDeleteTaskMutation,
  useRemoveUserFromTaskMutation,
} from "../../generated/graphql";

import useOutsideClick from "../../hooks/useOutsideClick";
import { gql } from "@apollo/client";

interface CardProps {
  pod: NonNullable<PodQuery["pod"]>;
  story: NonNullable<PodQuery["pod"]>["stories"][0];
  task: NonNullable<PodQuery["pod"]>["stories"][0]["tasks"][0];
  index: number;
}

const Card: React.FC<CardProps> = ({ pod, task, story, index }) => {
  // Menu
  const [toggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Modal
  const [modal, setModal] = useState(false);
  const [deleteTaskMutation] = useDeleteTaskMutation();

  // Assign users
  const [assignFilter, setAssignFilter] = useState("");
  const [assignUserToTaskMutation] = useAssignUserToTaskMutation();

  // Unassign user
  const [removeUserFromTaskMutation] = useRemoveUserFromTaskMutation();

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

  const handleAssignUserToTask = async (userId: number) => {
    await assignUserToTaskMutation({
      variables: { taskId: task.id, userId },
      update: (cache, { data }) => {
        if (data && data.assignUserToTask) {
          cache.modify({
            id: cache.identify(task),
            fields: {
              users(existingUsersRefs: any[], { readField }) {
                const newUserRef = cache.readFragment({
                  id: "User:" + userId,
                  fragment: gql`
                    fragment NewUser on User {
                      id
                      username
                    }
                  `,
                });
                return [newUserRef, ...existingUsersRefs];
              },
            },
          });
        }
      },
    });
  };

  const handleRemoveUserFromTask = async (userId: number) => {
    await removeUserFromTaskMutation({
      variables: { taskId: task.id, userId },
      update: (cache, { data }) => {
        if (data && data.removeUserFromTask) {
          cache.modify({
            id: cache.identify(task),
            fields: {
              users(existingUsersRefs: any[], { readField }) {
                return existingUsersRefs.filter(
                  (userRef) => readField("id", userRef) !== userId
                );
              },
            },
          });
        }
      },
    });
  };

  const filteredMembers = pod.members.filter((member) =>
    member.username.toLowerCase().includes(assignFilter.toLowerCase())
  );

  const filteredAdmins = pod.admins.filter((admin) =>
    admin.username.toLowerCase().includes(assignFilter.toLowerCase())
  );

  return (
    <Draggable key={task.id} draggableId={"T" + task.id} index={index}>
      {(provided, snapshot) => (
        <BorderBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          bg="white"
          width={300}
          py="10px"
          px="12px"
          mb={2}
        >
          <Flex justifyContent="space-between">
            <Heading fontSize={1}>{task.title}</Heading>
            <Flex color="gray.5">
              <SelectMenu mr={2}>
                <summary style={{ cursor: "pointer" }}>
                  <FiPlus />
                </summary>
                <SelectMenu.Modal width={200}>
                  <SelectMenu.Header>Assign members</SelectMenu.Header>
                  <SelectMenu.Filter
                    placeholder="Search members"
                    aria-label="Search members"
                    value={assignFilter}
                    variant="small"
                    onChange={(e) => setAssignFilter(e.target.value)}
                  />
                  <SelectMenu.List>
                    {filteredMembers.length > 0 && (
                      <SelectMenu.Divider>Members</SelectMenu.Divider>
                    )}
                    {filteredMembers.map((member) => (
                      <SelectMenu.Item
                        key={member.id}
                        onClick={() => handleAssignUserToTask(member.id)}
                      >
                        {member.username}
                      </SelectMenu.Item>
                    ))}
                    {filteredAdmins.length > 0 && (
                      <SelectMenu.Divider>Admins</SelectMenu.Divider>
                    )}
                    {filteredAdmins.map((admin) => (
                      <SelectMenu.Item
                        key={admin.id}
                        onClick={() => handleAssignUserToTask(admin.id)}
                      >
                        {admin.username}
                      </SelectMenu.Item>
                    ))}
                  </SelectMenu.List>
                </SelectMenu.Modal>
              </SelectMenu>
              <SelectMenu>
                <summary style={{ cursor: "pointer" }}>
                  <FiMoreHorizontal onClick={() => setToggleMenu(true)} />
                </summary>
                <SelectMenu.Modal width={150}>
                  <SelectMenu.List>
                    <SelectMenu.Item href="#">Rename</SelectMenu.Item>
                    <SelectMenu.Item onClick={handleDeleteTaskModal}>
                      Delete
                    </SelectMenu.Item>
                  </SelectMenu.List>
                </SelectMenu.Modal>
              </SelectMenu>
            </Flex>
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
          <Flex mt={1}>
            {task.users.map((user) => (
              <Label key={user.id} variant="medium" bg="#1C90FA" mr={1}>
                <Flex alignItems="center">
                  <Text mr={1}>{user.username}</Text>
                  <RiCloseLine
                    cursor="pointer"
                    onClick={() => handleRemoveUserFromTask(user.id)}
                  />
                </Flex>
              </Label>
            ))}
          </Flex>
        </BorderBox>
      )}
    </Draggable>
  );
};

export default Card;
