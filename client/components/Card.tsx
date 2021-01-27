import { Draggable } from "react-beautiful-dnd";
import { CardType } from "../pages";

interface CardProps {
  card: CardType;
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {(provided) => (
        <div
          className="bg-white border border-cream-100 rounded-md shadow-sm p-3"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="font-bold">{card.title}</div>
          <div className="text-sm">{card.description}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
