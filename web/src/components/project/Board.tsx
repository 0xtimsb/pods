import { Droppable } from "react-beautiful-dnd";

// Graphql
import { Story, Task } from "../../generated/graphql";

// Components
import Column from "./Column";

interface BoardProps {
  stories: ({
    __typename?: "Story" | undefined;
  } & Pick<Story, "title" | "id"> & {
      tasks: ({
        __typename?: "Task" | undefined;
      } & Pick<Task, "title" | "id">)[];
    })[];
}

const Board: React.FC<BoardProps> = ({ stories }) => {
  return (
    <Droppable droppableId="droppable" type="stories" direction="horizontal">
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className="p-4 flex">
          {stories.map((story, index) => (
            <Column key={story.id} story={story} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board;
