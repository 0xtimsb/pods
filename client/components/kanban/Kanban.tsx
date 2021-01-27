import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Hooks
import useKanban from "../../hooks/useKanban";

// Components
import Add from "./Add";
import List from "./List";

const Kanban = () => {
  const { lists, cards, listOrder, onDragEnd } = useKanban();
  return (
    <div className="flex justify-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listOrder.map((key, index) => {
                const list = lists[key];
                const listCards = list.cardIds.map((cardId) => cards[cardId]);
                return (
                  <List key={key} list={list} cards={listCards} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex flex-col py-3">
        <Add />
      </div>
    </div>
  );
};

export default Kanban;
