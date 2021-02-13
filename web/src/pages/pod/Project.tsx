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
      <div className="flex justify-center overflow-y-hidden">
        <Board pod={pod} stories={stories} onDragEnd={onDragEnd} />
      </div>
    </Layout>
  );
};

export default Project;
