import {
  DragDropContext,
  Droppable,
  Draggable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import cloneDeep from "lodash.clonedeep";

import Layout from "../../components/Layout";
import TaskX from "../../components/board/TaskX";
import {
  Task,
  useMoveStoryMutation,
  useMoveTaskMutation,
  usePodQuery,
} from "../../generated/graphql";

// Reordering in list.
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Board: React.FC = () => {
  const { data, loading, error } = usePodQuery({
    variables: { id: 1 },
  });
  const [moveStoryMutation] = useMoveStoryMutation();
  const [moveTaskMutation] = useMoveTaskMutation();

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.pod) return <p>Error occured</p>;

  const { pod } = data;
  const { stories } = pod;

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

      // Make rank update request to graphql server.
      moveStoryMutation({
        variables: {
          id: stories[sourceIndex].id,
          sourceIndex,
          destinationIndex,
        },
        optimisticResponse: {
          __typename: "Mutation",
          moveStory: true,
        },
        update: (proxy) => {
          proxy.modify({
            id: proxy.identify(pod),
            fields: {
              stories(existingStoryRefs) {
                return reorder(
                  existingStoryRefs,
                  sourceIndex,
                  destinationIndex
                );
              },
            },
          });
        },
      });
    } else if (result.type === "tasks") {
      // Make map
      const map = stories.reduce((acc: any, story) => {
        acc["S" + story.id] = story.tasks;
        return acc;
      }, {});

      const sourceParentId = result.source.droppableId;
      const destinationParentId = result.destination.droppableId;

      const sourceTasks: Task[] = map[sourceParentId];
      const destinationTasks: Task[] = map[destinationParentId];

      let newStories = cloneDeep(stories);

      // result.source.index refers to index of task in that story!

      const sourceStory = stories.find(
        (story) => "S" + story.id === sourceParentId
      );
      const destinationStory = stories.find(
        (story) => "S" + story.id === destinationParentId
      );

      // If not valid.
      if (!sourceStory || !destinationStory) return;

      // If tasks are reordered in same story.
      if (sourceParentId === destinationParentId) {
        // Make rank update request to graphql server.
        moveTaskMutation({
          variables: {
            id: sourceTasks[sourceIndex].id,
            sourceIndex,
            destinationIndex,
            sourceStoryId: sourceStory.id,
            destinationStoryId: destinationStory.id,
          },
          optimisticResponse: {
            __typename: "Mutation",
            moveTask: true,
          },
          update: (proxy) => {
            proxy.modify({
              id: proxy.identify(sourceStory),
              fields: {
                tasks(existingTaskRefs) {
                  console.log("Before: ", existingTaskRefs);
                  const reorderedTasks = reorder(
                    existingTaskRefs,
                    sourceIndex,
                    destinationIndex
                  );
                  return reorderedTasks;
                },
              },
            });
          },
        });
      } else {
        // If tasks are reordered between diffrent stories.
        moveTaskMutation({
          variables: {
            id: sourceTasks[sourceIndex].id,
            sourceIndex,
            destinationIndex,
            sourceStoryId: sourceStory.id,
            destinationStoryId: destinationStory.id,
          },
          optimisticResponse: {
            __typename: "Mutation",
            moveTask: true,
          },
          update: (proxy) => {
            let draggedItem: Task;
            proxy.modify({
              id: proxy.identify(sourceStory),
              fields: {
                tasks(existingTaskRefs: Task[]) {
                  const newSourceTasks = Array.from(existingTaskRefs);
                  [draggedItem] = newSourceTasks.splice(sourceIndex, 1);
                  return newSourceTasks;
                },
              },
            });
            proxy.modify({
              id: proxy.identify(destinationStory),
              fields: {
                tasks(existingTaskRefs: Task[]) {
                  const newDestinationTasks = Array.from(existingTaskRefs);
                  newDestinationTasks.splice(destinationIndex, 0, draggedItem);
                  return newDestinationTasks;
                },
              },
            });
          },
        });
      }
    }
  };

  return (
    <Layout>
      <div className="flex-grow flex flex-col items-center">
        <div className="max-w-6xl w-full pt-4">
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
                      draggableId={"S" + story.id}
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
                          <TaskX subItems={story.tasks} type={"S" + story.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </Layout>
  );
};

export default Board;
