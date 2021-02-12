import { Draggable, Droppable } from "react-beautiful-dnd";

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
          className={snapshot.isDragging ? "" : ""}
        >
          {story.title}
          <span
            {...provided.dragHandleProps}
            style={{
              display: "inline-block",
              margin: "0 10px",
              border: "1px solid #000",
            }}
          >
            Drag
          </span>
          <Droppable droppableId={"S" + story.id} type="tasks">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={snapshot.isDraggingOver ? "" : ""}
              >
                {story.tasks.map((task, index) => (
                  <Card task={task} index={index} />
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
