import { Draggable, Droppable } from "react-beautiful-dnd";

import { CardType, ColumnType } from "../types/app";
import Card from "./Card";

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column, cards, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(columnProvided) => (
        <div
          className="flex flex-col w-64 px-2"
          {...columnProvided.draggableProps}
          ref={columnProvided.innerRef}
        >
          <div className="flex py-4" {...columnProvided.dragHandleProps}>
            <div className="flex-grow border-b-2 h-1/2 border-cream-100"></div>
            <div className="font-bold text-lg px-4"> {column.title}</div>
            <div className="flex-grow border-b-2 h-1/2 border-cream-100"></div>
          </div>
          <Droppable droppableId={column.id} type="card">
            {(provided) => (
              <div
                className="flex flex-col flex-grow"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {cards.map((card, cardIndex) => (
                  <Card key={card.id} card={card} index={cardIndex} />
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
