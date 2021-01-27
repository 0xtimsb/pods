import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";

// Hooks
import useKanban from "../../hooks/useKanban";
import { ListType } from "../../types/app";

// Components
import Add from "./Add";
import List from "./List";

const Kanban = () => {
  const {
    lists,
    cards,
    listOrder,
    onDragEnd,
    onDragStart,
    setLists,
    setListOrder,
  } = useKanban();

  const handleAddList = () => {
    const newKey = `l-${v4()}`;
    const newList: ListType = { id: newKey, title: "New List", cardIds: [] };
    setLists({ ...lists, [newKey]: newList });
    setListOrder([...listOrder, newKey]);
  };

  return (
    <div className="flex justify-center">
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
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
        <Add onClick={handleAddList} />
      </div>
    </div>
  );
};

export default Kanban;
