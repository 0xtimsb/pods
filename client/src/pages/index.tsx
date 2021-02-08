import Layout from "../components/Layout";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import { gql } from "@apollo/client";

const Home = () => {
  return <Layout>Index page</Layout>;
};

export async function getServerSideProps({ res }) {
  const apolloClient = initializeApollo();

  apolloClient.query({});

  const { data } = await apolloClient.query({
    query: gql`
      query ME {
        me {
          id
          username
        }
      }
    `,
  });

  if (!data.me) {
    return addApolloState(apolloClient, {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    });
  }

  return addApolloState(apolloClient, {
    props: {},
  });
}

export default Home;
