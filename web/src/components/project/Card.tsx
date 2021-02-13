import { Draggable } from "react-beautiful-dnd";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsCardText } from "react-icons/bs";

// Graphql
import { Task } from "../../generated/graphql";

interface CardProps {
  task: {
    __typename?: "Task" | undefined;
  } & Pick<Task, "title" | "id">;
  index: number;
}

const Card: React.FC<CardProps> = ({ task, index }) => {
  return (
    <Draggable key={task.id} draggableId={"T" + task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-2 p-2 gap-1 flex flex-col bg-white border shadow-sm rounded-md hover:shadow hover:border-gray-300 ${
            snapshot.isDragging && "ring border-blue-500"
          }`}
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <BsCardText className="text-base text-gray-500" />
              <div className="text-sm font-medium text-gray-900">
                {task.title}
              </div>
            </div>
            <FiMoreHorizontal className="text-lg text-gray-500 cursor-pointer" />
          </div>
          <div className="text-xs pl-6">
            <span className="text-gray-500">Added by </span>
            <span className="text-gray-900">fdsgds</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
