import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Components
import Kanban from "../../components/Kanban";

function Pod({ podId }) {
  return (
    <div>
      <Kanban podId={podId} />
    </div>
  );
}

export default Pod;
