import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

// Graphql
import {
  Pod,
  PodQuery,
  PodQueryResult,
  PodResponse,
  Story,
  Task,
} from "../../generated/graphql";
import useProject from "../../hooks/useProject";
import Container from "../Container";

// Components
import Column from "./Column";

interface BoardProps {
  pod: Pod;
}

const Board: React.FC<BoardProps> = ({ pod }) => {
  const [onDragEnd] = useProject(pod);

  const { stories } = pod;

  return (
    <Container>
      <div className="flex justify-center overflow-y-hidden">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="droppable"
            type="stories"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className="py-3 max-w-7xl flex-1 flex"
              >
                {stories.map((story, index) => (
                  <Column
                    key={story.id}
                    pod={pod}
                    story={story}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Container>
  );
};

export default Board;
