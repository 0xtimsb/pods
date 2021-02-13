import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

// Graphql
import { Pod, Story, Task } from "../../generated/graphql";

// Components
import Column from "./Column";

interface BoardProps {
  pod: {
    __typename?: "Pod" | undefined;
  } & Pick<Pod, "id" | "name"> & {
      stories: ({
        __typename?: "Story" | undefined;
      } & Pick<Story, "title" | "id"> & {
          tasks: ({
            __typename?: "Task" | undefined;
          } & Pick<Task, "title" | "id">)[];
        })[];
    };
  stories: ({
    __typename?: "Story" | undefined;
  } & Pick<Story, "title" | "id"> & {
      tasks: ({
        __typename?: "Task" | undefined;
      } & Pick<Task, "title" | "id">)[];
    })[];
  onDragEnd: OnDragEndResponder;
}

const Board: React.FC<BoardProps> = ({ pod, stories, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="stories" direction="horizontal">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} className="py-3 max-w-7xl flex-1 flex">
            {stories.map((story, index) => (
              <Column key={story.id} pod={pod} story={story} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
