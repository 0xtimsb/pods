import { DragDropContext } from "react-beautiful-dnd";

// Graphql
import { usePodQuery } from "../../generated/graphql";

// Hooks
import useProject from "../../hooks/useProject";

// Components
import Layout from "../../components/Layout";
import Board from "../../components/project/Board";

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
            <Board stories={stories} />
          </DragDropContext>
        </div>
      </div>
    </Layout>
  );
};

export default Project;
