import Head from "next/head";
import { v4 as uuid } from "uuid";
import update from "immutability-helper";
import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { IoAdd } from "react-icons/io5";

import Column from "../components/Column";
import { CardType, ColumnType } from "../types/app";

function Home() {
  const [cards, setCards] = useState<{ [key: string]: CardType }>({
    "1": { id: "1", title: "Card 1", description: "New Card Decribtion" },
    "2": { id: "2", title: "Card 2", description: "New Card Decribtion" },
    "3": { id: "3", title: "Card 3", description: "New Card Decribtion" },
  });
  const [columns, setColumns] = useState<{ [key: string]: ColumnType }>({
    "4": {
      id: "4",
      title: "Todo",
      cardIds: ["1", "2"],
    },
    "5": {
      id: "5",
      title: "Todo 2",
      cardIds: ["3"],
    },
  });
  const [columnOrder, setColumnOrder] = useState<string[]>(["4", "5"]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      const newColumnOrder = [...columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setColumnOrder(newColumnOrder);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const newColumn: ColumnType = { ...start, cardIds: newCardIds };
      const newColumns = { ...columns, [newColumn.id]: newColumn };

      setColumns(newColumns);
      return;
    }

    // Moving from one column to another
    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart: ColumnType = { ...start, cardIds: startCardIds };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish: ColumnType = { ...finish, cardIds: finishCardIds };
    setColumns({
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    });
  };

  return (
    <div className="bg-cream-50 h-screen flex justify-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnOrder.map((key, index) => {
                const column = columns[key];
                const columnCards = column.cardIds.map(
                  (cardId) => cards[cardId]
                );
                return (
                  <Column
                    key={key}
                    column={column}
                    cards={columnCards}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="flex flex-col py-3">
        <div className="cursor-pointer rounded-full hover:bg-cream-100 p-2">
          <IoAdd fontSize={21} />
        </div>
      </div>
    </div>
  );
}

export default Home;
