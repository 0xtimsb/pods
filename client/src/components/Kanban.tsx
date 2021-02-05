import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import cloneDeep from "lodash.clonedeep";

import Card from "./Card";
import {
  PodQuery,
  useMoveStoryMutation,
  usePodQuery,
} from "../generated/graphql";

interface KanbanProps {
  podId: number;
}

// Reordering in list.
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Kanban: React.FC<KanbanProps> = ({ podId }) => {
  const { data } = usePodQuery({ variables: { id: podId } });
  const [moveStoryMutation] = useMoveStoryMutation();

  const [stories, setStories] = useState<PodQuery["pod"]["stories"]>(null);

  useEffect(() => {
    if (data) {
      setStories(data.pod.stories);
    }
  }, [data]);

  if (!stories) return <p>Loading...</p>;

  const onDragEnd: OnDragEndResponder = (result) => {
    // Dropped somewhere not in context.
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // If stories reorder, else figure out how to reorder tasks.
    if (result.type === "stories") {
      if (sourceIndex === destinationIndex) return;
      const newStories = reorder(stories, sourceIndex, destinationIndex);
      setStories(newStories);

      // Make rank update request to graphql server.
      moveStoryMutation({
        variables: {
          id: stories[sourceIndex].id,
          sourceIndex,
          destinationIndex,
        },
      });
    } else if (result.type === "tasks") {
      // Make map
      const map = stories.reduce((acc, story) => {
        acc[story.__typename + story.id] = story.tasks;
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
          if (story.__typename + story.id === sourceParentId) {
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
          if (story.__typename + story.id === sourceParentId) {
            story.tasks = newSourceTasks;
          } else if (story.__typename + story.id === destinationParentId) {
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
              <Draggable
                key={story.id}
                draggableId={story.__typename + story.id}
                index={index}
              >
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
                    <Card
                      subItems={story.tasks}
                      type={story.__typename + story.id}
                    />
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
