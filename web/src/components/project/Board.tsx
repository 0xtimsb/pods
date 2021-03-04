import { Flex } from "@primer/components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Graphql
import { Pod, PodQuery } from "../../generated/graphql";
import useProject from "../../hooks/useProject";
import Container from "../Container";

// Components
import Column from "./Column";

interface BoardProps {
  pod: NonNullable<PodQuery["pod"]>;
}

const Board: React.FC<BoardProps> = ({ pod }) => {
  const [onDragEnd] = useProject(pod);

  const { stories } = pod;

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="droppable"
          type="stories"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <Flex ref={provided.innerRef} py={3} flex={1}>
              {stories.map((story, index) => (
                <Column key={story.id} pod={pod} story={story} index={index} />
              ))}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default Board;
