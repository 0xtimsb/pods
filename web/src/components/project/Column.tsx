import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FiPlus, FiMoreHorizontal } from "react-icons/fi";

// Graphql
import { Story, Task } from "../../generated/graphql";

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
  const [toggleAdd, setToggleAdd] = useState(false);
  const [text, setText] = useState("");

  return (
    <Draggable key={story.id} draggableId={"S" + story.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex flex-col w-80 mr-3 bg-gray-50 border rounded-md ${
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
                  disabled={text === ""}
                >
                  Add
                </button>
                <button
                  className="flex-1 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none"
                  onClick={() => setToggleAdd(false)}
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
                className="flex-1 flex flex-col px-3 overflow-y-auto"
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
