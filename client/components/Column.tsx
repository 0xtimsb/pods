import { Draggable, Droppable } from "react-beautiful-dnd";
import { CardType, ColumnType } from "../pages/index";
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
          className="flex flex-col w-60"
          {...columnProvided.draggableProps}
          ref={columnProvided.innerRef}
        >
          <div className="p-3" {...columnProvided.dragHandleProps}>
            {column.title}
          </div>
          <Droppable droppableId={column.id} type="card">
            {(provided) => (
              <div
                className="flex-grow"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {cards.map((card, cardIndex) => (
                  <Card card={card} index={cardIndex} />
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
