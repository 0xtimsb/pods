import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

// Components
import Kanban from "../../components/Kanban";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  let { podId } = context.query;
  if (Array.isArray(podId)) podId = podId[0];
  return {
    props: {
      podId: parseInt(podId),
    },
  };
};

function Pod({ podId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Kanban podId={podId} />
    </div>
  );
}

export default Pod;
