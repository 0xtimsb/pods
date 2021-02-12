import { Draggable } from "react-beautiful-dnd";

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
          className={snapshot.isDragging ? "" : ""}
        >
          {task.title}
          <span {...provided.dragHandleProps}>Drag</span>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
