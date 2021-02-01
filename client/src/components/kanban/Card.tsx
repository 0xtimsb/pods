import { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdEdit, MdClose } from "react-icons/md";

// Context
import { AppContext } from "../../store/context";

// Types
import { CardType } from "../../types/app";

interface CardProps {
  card: CardType;
  cards: {
    [key: string]: CardType;
  };
  index: number;
}

const Card: React.FC<CardProps> = ({ card, cards, index }) => {
  const [hover, setHover] = useState<boolean>(false);

  const { state } = useContext(AppContext);

  const handleRemoveCard = () => {
    cards[card.id];
  };

  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {(provided) => (
        <div
          className="relative mb-3"
          {...provided.draggableProps}
          ref={provided.innerRef}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className="bg-white border border-cream-200 rounded-md shadow-sm p-3"
            {...provided.dragHandleProps}
          >
            <div className="font-bold">{card.title}</div>
            <div className="text-xs">{card.description}</div>
          </div>
          {hover && !state.isDragging && (
            <div className="flex absolute -bottom-1.5 -right-1.5 bg-white border border-cream-200 rounded-md shadow gap-3 px-3 py-2">
              <MdEdit className="cursor-pointer" />
              <MdClose className="cursor-pointer" onClick={handleRemoveCard} />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
