import { Draggable, Droppable } from "react-beautiful-dnd";

import { CardType, ListType } from "../../types/app";
import Card from "./Card";

interface ListProps {
  list: ListType;
  cards: {
    [key: string]: CardType;
  };
  index: number;
}

const List: React.FC<ListProps> = ({ list, cards, index }) => {
  const listCards = list.cardIds.map((cardId) => cards[cardId]);
  return (
    <Draggable draggableId={list.id} index={index}>
      {(listProvided) => (
        <div
          className="flex flex-col w-64 px-2"
          {...listProvided.draggableProps}
          ref={listProvided.innerRef}
        >
          <div className="flex py-4" {...listProvided.dragHandleProps}>
            <div className="flex-grow border-b-2 h-1/2 border-cream-200"></div>
            <div className="font-bold text-lg px-4"> {list.title}</div>
            <div className="flex-grow border-b-2 h-1/2 border-cream-200"></div>
          </div>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div
                className="flex flex-col flex-grow"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listCards.map((card, cardIndex) => (
                  <Card
                    key={card.id}
                    card={card}
                    cards={cards}
                    index={cardIndex}
                  />
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

export default List;
