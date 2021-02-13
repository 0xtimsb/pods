import { gql } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FiPlus, FiMoreHorizontal } from "react-icons/fi";

// Graphql
import { Story, Task, useCreateTaskMutation } from "../../generated/graphql";

// Components
import Card from "./Card";

interface ColumnProps {
  story: {
    __typename?: "Story" | undefined;
  } & Pick<Story, "title" | "id"> & {
      tasks: ({
        __typename?: "Task" | undefined;
      } & Pick<Task, "title" | "id">)[];
    };
  index: number;
}

const Column: React.FC<ColumnProps> = ({ story, index }) => {
  const [createTaskMutation] = useCreateTaskMutation();
  const [toggleAdd, setToggleAdd] = useState(false);
  const [text, setText] = useState("");

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

  const handleCancel = () => {
    setToggleAdd(false);
    setText("");
  };

  return (
    <Draggable key={story.id} draggableId={"S" + story.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex flex-col flex-1 bg-gray-50 border rounded-md mr-3 ${
            snapshot.isDragging && "ring border-blue-500"
          }`}
        >
          <div className="p-3 flex justify-between">
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
              <FiMoreHorizontal className="cursor-pointer" />
            </div>
          </div>
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
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <Droppable droppableId={"S" + story.id} type="tasks">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="pb-1 flex-1 flex flex-col px-3 overflow-y-auto overflow-x-hidden"
              >
                {story.tasks.map((task, index) => (
                  <Card key={task.id} task={task} index={index} />
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
