import { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MdEdit, MdClose } from "react-icons/md";

// Context
import { AppContext } from "../../store/context";

// Types
import { CardType } from "../../types/app";

interface CardProps {
  card: CardType;
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  const [hover, setHover] = useState<boolean>(false);

  const { state } = useContext(AppContext);

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
            <div className="overflow-hidden flex absolute -bottom-1.5 -right-1.5 bg-white border border-cream-200 rounded-md shadow">
              <div className="cursor-pointer p-2 flex justify-center items-center hover:bg-gray-100">
                <MdEdit />
              </div>
              <div className="cursor-pointer p-2 flex justify-center items-center hover:bg-gray-100">
                <MdClose />
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
