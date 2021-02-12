import { Droppable, Draggable } from "react-beautiful-dnd";
import { Pod, PodQuery, Task } from "../../generated/graphql";

const TaskX = ({ type, subItems }: { type: string; subItems: any[] }) => {
  return (
    <Droppable droppableId={type} type="tasks">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={snapshot.isDraggingOver ? "" : ""}
        >
          {subItems.map((item, index) => (
            <Draggable key={item.id} draggableId={"T" + item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className={snapshot.isDragging ? "" : ""}
                >
                  {item.title}
                  <span {...provided.dragHandleProps}>Drag</span>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskX;
