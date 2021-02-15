import { Link, generatePath } from "react-router-dom";
import { RiAddLine, RiBookMarkLine, RiFileAddLine } from "react-icons/ri";

// Graphql
import { MeQuery } from "../../generated/graphql";

// Routes
import { POD } from "../../constants/routes";

// Components
import Layout from "../../components/Layout";
import { gql, useApolloClient } from "@apollo/client";
import { FiSmile } from "react-icons/fi";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const client = useApolloClient();
  const data = client.readQuery<MeQuery>({
    query: gql`
      query Me {
        me {
          username
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
        <div className="flex max-w-7xl w-full py-3 items-start gap-3">
          <div className="w-72 flex flex-col bg-gray-50 border rounded-md gap-3 p-3">
            <div className="flex gap-2 items-center font-bold">
              <FiSmile className="text-2xl" />
              <div className="text-lg text-gray-900">{data?.me?.username}</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col bg-gray-50 border rounded-md gap-3 p-3">
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-bold">
                  <div className="text-xs text-gray-800 w-6 h-6 flex justify-center items-center bg-gray-200 rounded-full">
                    {pods.length}
                  </div>
                  <div className="text-lg text-gray-900">Pods</div>
                </div>
                <div className="flex gap-2 h-8 text-sm">
                  <button className="px-4 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none">
                    Create Pod
                  </button>
                  <button className="px-4 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none">
                    Join Pod
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {pods.map(({ id, name }) => (
                  <div
                    key={id}
                    className="bg-white shadow-sm border rounded-md p-4 h-28 hover:shadow"
                  >
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
        </div>
      </div>
    </Layout>
  );
};

export default Home;
