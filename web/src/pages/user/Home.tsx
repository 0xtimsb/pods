import { Link, generatePath } from "react-router-dom";
import { RiBookMarkLine } from "react-icons/ri";

// Graphql
import { MeQuery } from "../../generated/graphql";

// Routes
import { POD } from "../../constants/routes";

// Components
import Layout from "../../components/common/Layout";
import { gql, useApolloClient } from "@apollo/client";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const client = useApolloClient();
  const data = client.readQuery<MeQuery>({
    query: gql`
      query Me {
        me {
          pods {
            id
            name
          }
        }
      }
    `,
  });

  const pods = data?.me?.pods || [];

  return (
    <Layout>
      <div className="flex-grow flex flex-col items-center">
        <div className="max-w-6xl w-full pt-4">
          <div className="grid grid-cols-3 gap-4">
            {pods.map(({ id, name }) => (
              <div key={id} className="border rounded-md border-gray-300 p-4">
                <div className="flex items-center space-x-2">
                  <RiBookMarkLine fontSize={18} />
                  <Link
                    to={generatePath(POD, { id })}
                    className="font-medium hover:underline"
                  >
                    {name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
