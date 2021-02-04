import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import cloneDeep from "lodash.clonedeep";
import Card from "./Card";
import { usePodQuery } from "../generated/graphql";

// Reordering in list.
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface KanbanProps {
  podId: number;
}

interface Story {
  id: string;
  rank: string;
  title: string;
  tasks: Task[];
}

interface Task {
  id: string;
  rank: string;
  title: string;
}

const Kanban: React.FC<KanbanProps> = ({ podId }) => {
  const { data } = usePodQuery({ variables: { id: podId } });
  const [stories, setStories] = useState<Story[]>(null);

  // Update stories when data updates!
  useEffect(() => {
    if (data) {
      const { pod } = data;
      const newStories = pod.stories.map(({ id, title, rank, tasks }) => {
        const newId = "S" + id;
        const newTasks = tasks.map(({ id, rank, title }) => {
          const newId = "T" + id;
          return { id: newId + id, rank, title };
        });
        return { id: newId, rank, title, tasks: newTasks };
      });
      setStories(newStories);
    }
  }, [data]);

  if (!stories) return null;

  const onDragEnd: OnDragEndResponder = (result) => {
    // Dropped somewhere not in context.
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // If stories reorder, else figure out how to reorder tasks.
    if (result.type === "stories") {
      const items = reorder(stories, sourceIndex, destinationIndex);
      setStories(items);
    } else if (result.type === "tasks") {
      // Make map
      const map = stories.reduce((acc, story) => {
        acc[story.id] = story.tasks;
        return acc;
      }, {});

      const sourceParentId = result.source.droppableId;
      const destinationParentId = result.destination.droppableId;

      const sourceTasks = map[sourceParentId];
      const destinationTasks = map[destinationParentId];

      let newStories = cloneDeep(stories);

      // If tasks are reordered in same story.
      if (sourceParentId === destinationParentId) {
        const reorderedTasks = reorder(
          sourceTasks,
          sourceIndex,
          destinationIndex
        );
        newStories = newStories.map((story) => {
          if (story.id === sourceParentId) {
            story.tasks = reorderedTasks;
          }
          return story;
        });
        setStories(newStories);
      } else {
        // If tasks are reordered between diffrent stories.
        let newSourceTasks = cloneDeep(sourceTasks);
        const [draggedItem] = newSourceTasks.splice(sourceIndex, 1);

        let newDestinationTasks = cloneDeep(destinationTasks);
        newDestinationTasks.splice(destinationIndex, 0, draggedItem);
        newStories = newStories.map((story) => {
          if (story.id === sourceParentId) {
            story.tasks = newSourceTasks;
          } else if (story.id === destinationParentId) {
            story.tasks = newDestinationTasks;
          }
          return story;
        });
        setStories(newStories);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="stories">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={snapshot.isDraggingOver ? "" : ""}
          >
            {stories.map((story, index) => (
              <Draggable key={story.id} draggableId={story.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={snapshot.isDragging ? "" : ""}
                  >
                    {story.title}
                    <span
                      {...provided.dragHandleProps}
                      style={{
                        display: "inline-block",
                        margin: "0 10px",
                        border: "1px solid #000",
                      }}
                    >
                      Drag
                    </span>
                    <Card subItems={story.tasks} type={story.id} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
