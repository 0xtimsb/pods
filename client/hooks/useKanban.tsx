import { useContext, useState } from "react";
import { DropResult } from "react-beautiful-dnd";

// Store
import { AppContext } from "../store/context";
import { Types } from "../store/reducers";

// Types
import { CardType, ListType } from "../types/app";

const useKanban = () => {
  const [cards, setCards] = useState<{ [key: string]: CardType }>({
    "c-1": {
      id: "c-1",
      title: "Star the repo!",
      description: "New Card Decribtion",
    },
    "c-2": {
      id: "c-2",
      title: "Fork the repo!",
      description: "New Card Decribtion",
    },
    "c-3": {
      id: "c-3",
      title: "Check out Pod.",
      description:
        "Use Pod for Project Management and Communicaion with Teams.",
    },
  });
  const [lists, setLists] = useState<{ [key: string]: ListType }>({
    "l-1": {
      id: "l-1",
      title: "To Do",
      cardIds: ["c-1", "c-2"],
    },
    "l-2": {
      id: "l-2",
      title: "In Progress",
      cardIds: ["c-3"],
    },
    "l-3": {
      id: "l-3",
      title: "Review",
      cardIds: [],
    },
    "l-4": {
      id: "l-4",
      title: "Done",
      cardIds: [],
    },
  });
  const [listOrder, setListOrder] = useState<string[]>([
    "l-1",
    "l-2",
    "l-3",
    "l-4",
  ]);

  const { dispatch } = useContext(AppContext);

  const onDragEnd = (result: DropResult) => {
    // Dispatch action to change state to not dragging.
    dispatch({ type: Types.NotDragging });

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
    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const newStart: ListType = { ...start, cardIds: startCardIds };

    const finishCardIds = [...finish.cardIds];
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish: ListType = { ...finish, cardIds: finishCardIds };
    setLists({
      ...lists,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  const onDragStart = () => {
    // Toggle dragging
    dispatch({ type: Types.Dragging });
  };

  return {
    lists,
    cards,
    listOrder,
    onDragEnd,
    onDragStart,
    setLists,
    setCards,
    setListOrder,
  };
};

export default useKanban;
