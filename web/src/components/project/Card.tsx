import { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import {
  BorderBox,
  Box,
  Button,
  ButtonPrimary,
  Dialog,
  Flex,
  Heading,
  Label,
  LabelGroup,
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
import useModal from "../../hooks/useModal";

interface CardProps {
  pod: NonNullable<PodQuery["pod"]>;
  story: NonNullable<PodQuery["pod"]>["stories"][0];
  task: NonNullable<PodQuery["pod"]>["stories"][0]["tasks"][0];
  index: number;
}

const Card: React.FC<CardProps> = ({ pod, task, story, index }) => {
  // Modal
  const { buttonProps, dialogProps, handleClose } = useModal();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  // Assign users
  const [assignFilter, setAssignFilter] = useState("");
  const [assignUserToTaskMutation] = useAssignUserToTaskMutation();

  // Unassign user
  const [removeUserFromTaskMutation] = useRemoveUserFromTaskMutation();

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
  };

  const handleAssignUserToTask = async (userId: number) => {
    await assignUserToTaskMutation({
      variables: { taskId: task.id, userId },
      update: (cache, { data }) => {
        if (data && data.assignUserToTask) {
          cache.modify({
            id: cache.identify(task),
            fields: {
              users(existingUsersRefs: any[]) {
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
                  <FiMoreHorizontal />
                </summary>
                <SelectMenu.Modal width={150}>
                  <SelectMenu.List>
                    <SelectMenu.Item {...buttonProps}>Delete</SelectMenu.Item>
                  </SelectMenu.List>
                </SelectMenu.Modal>
              </SelectMenu>
            </Flex>
          </Flex>
          <Dialog
            {...dialogProps}
            onDismiss={handleClose}
            aria-labelledby="label"
          >
            <Dialog.Header>Are you sure you want to delete task?</Dialog.Header>
            <Text>{task.title}</Text>
            <Box p={3}>
              <Flex mt={3} justifyContent="flex-end">
                <Button mr={1} onClick={handleClose}>
                  Cancel
                </Button>
                <ButtonPrimary onClick={handleDeleteTask}>Delete</ButtonPrimary>
              </Flex>
            </Box>
          </Dialog>
          <Flex mt={1}>
            <LabelGroup>
              {task.users.map((user) => (
                <Label key={user.id} variant="medium" bg="#1C90FA">
                  <Flex alignItems="center">
                    <Text mr={1}>{user.username}</Text>
                    <RiCloseLine
                      cursor="pointer"
                      onClick={() => handleRemoveUserFromTask(user.id)}
                    />
                  </Flex>
                </Label>
              ))}
            </LabelGroup>
          </Flex>
        </BorderBox>
      )}
    </Draggable>
  );
};

export default Card;
