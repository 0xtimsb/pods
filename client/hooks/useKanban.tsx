import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

// Types
import { CardType, ListType } from "../types/app";

const useKanban = () => {
  const [cards, setCards] = useState<{ [key: string]: CardType }>({
    "c-1": { id: "c-1", title: "Card 1", description: "New Card Decribtion" },
    "c-2": { id: "c-2", title: "Card 2", description: "New Card Decribtion" },
    "c-3": { id: "c-3", title: "Card 3", description: "New Card Decribtion" },
  });
  const [lists, setLists] = useState<{ [key: string]: ListType }>({
    "l-1": {
      id: "l-1",
      title: "Todo",
      cardIds: ["c-1", "c-2"],
    },
    "l-2": {
      id: "l-2",
      title: "Todo 2",
      cardIds: ["c-3"],
    },
  });
  const [listOrder, setListOrder] = useState<string[]>(["l-1", "l-2"]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // If card is dropped somewhere else from list, return.
    if (!destination) return;

    // If card is dropped at same place, return.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // If we are dragging list, change listOrder.
    if (type === "list") {
      const newListOrder = [...listOrder];
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);
      setListOrder(newListOrder);
      return;
    }

    // Moving card from same list.
    const start = lists[source.droppableId];
    const finish = lists[destination.droppableId];
    if (start === finish) {
      const newCardIds = [...start.cardIds];
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newList: ListType = { ...start, cardIds: newCardIds };
      const newLists = { ...lists, [newList.id]: newList };
      setLists(newLists);
      return;
    }

    // Moving card from one list to other list.
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart: ListType = { ...start, cardIds: startCardIds };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish: ListType = { ...finish, cardIds: finishCardIds };
    setLists({
      ...lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  return { lists, cards, listOrder, onDragEnd };
};

export default useKanban;
