import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Card = ({ type, subItems }) => {
  return (
    <Droppable droppableId={type} type="tasks">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={snapshot.isDraggingOver ? "" : ""}
        >
          {subItems.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.__typename + item.id}
              index={index}
            >
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

export default Card;
