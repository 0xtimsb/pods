import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Components
import Layout from "../../components/Layout";
import TaskX from "../../components/board/TaskX";

// Graphql
import { usePodQuery } from "../../generated/graphql";

// Hooks
import useProject from "../../hooks/useProject";

const Project: React.FC = () => {
  const { data, loading, error } = usePodQuery({
    variables: { id: 1 },
  });

  const [onDragEnd] = useProject(data);

  if (loading) return <p>Loading...</p>;

  if (error || !data || !data.pod) return <p>Error occured</p>;

  const { pod } = data;
  const { stories } = pod;

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

export default Project;
