import { gql } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
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
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex flex-col w-72 bg-gray-50 border rounded-md mr-3 ${
            snapshot.isDragging && "ring border-blue-500"
          }`}
        >
          <div
            className="p-3 flex justify-between"
            {...provided.dragHandleProps}
          >
            <div className="flex gap-2 items-center font-semibold">
              <div className="text-xs text-gray-800 w-6 h-6 flex justify-center items-center bg-gray-200 rounded-full">
                {story.tasks.length}
              </div>
              <div className="text-sm text-gray-900">{story.title}</div>
            </div>
            <div className="text-xl text-gray-500 flex gap-3 items-center">
              <FiPlus
                className="cursor-pointer hover:text-blue-500"
                onClick={() => setToggleAdd(true)}
              />
              <FiMoreHorizontal
                className="cursor-pointer"
                onClick={() => setToggleMenu(true)}
              />
            </div>
          </div>
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
            <div className="px-3 flex flex-col gap-2 mb-2">
              <textarea
                className="h-16 px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:ring focus:border-blue-500 focus:outline-none"
                placeholder="Enter your task"
                autoFocus={true}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="flex gap-2 h-8 text-sm">
                <button
                  className="flex-1 text-white bg-green-500 border border-green-600 rounded-md font-medium shadow-sm hover:bg-green-600  focus:ring focus:ring-green-500 focus:ring-opacity-40 focus:outline-none disabled:opacity-50 disabled:cursor-default"
                  onClick={handleCreateTask}
                  disabled={text === ""}
                >
                  Add
                </button>
                <button
                  className="flex-1 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none"
                  onClick={handleCancelAddTask}
                >
                  Cancel
                </button>
              </div>
            </div>
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
              <div
                ref={provided.innerRef}
                className="pb-1 flex-1 flex flex-col px-3 overflow-y-auto overflow-x-hidden"
              >
                {story.tasks.map((task, index) => (
                  <Card key={task.id} task={task} story={story} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
