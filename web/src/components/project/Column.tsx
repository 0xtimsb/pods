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
  return (
    <Draggable key={story.id} draggableId={"S" + story.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`w-80 mr-3 bg-gray-50 border rounded-md ${
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
              <FiPlus className="cursor-pointer hover:text-blue-500" />
              <FiMoreHorizontal className="cursor-pointer" />
            </div>
          </div>
          <Droppable droppableId={"S" + story.id} type="tasks">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className="flex flex-col px-3">
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
