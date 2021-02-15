import { useState } from "react";
import { Link, generatePath } from "react-router-dom";
import { gql, useApolloClient } from "@apollo/client";
import {
  RiAddLine,
  RiBookMarkLine,
  RiCloseLine,
  RiFileAddLine,
} from "react-icons/ri";
import { FiSmile } from "react-icons/fi";

// Graphql
import { MeQuery, useCreatePodMutation } from "../../generated/graphql";

// Routes
import { POD } from "../../constants/routes";

// Components
import Layout from "../../components/Layout";
import { convertToObject } from "typescript";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const client = useApolloClient();

  // Modal
  const [modal, setModal] = useState(false);
  const [text, setText] = useState("");
  const [createPodMutation] = useCreatePodMutation();

  const data = client.readQuery<MeQuery>({
    query: gql`
      query Me {
        me {
          id
          username
          pods {
            id
            name
          }
        }
      }
    `,
  });

  const me = data?.me;
  const pods = me?.pods || [];

  const handleCreatePod = async () => {
    await createPodMutation({
      variables: { name: text },
      update: (cache, { data }) => {
        if (data && data.createPod && me) {
          console.log(data.createPod.pod);
          cache.modify({
            id: cache.identify(me),
            fields: {
              pods(existingPodsRefs: any[], { readField }) {
                console.log(existingPodsRefs);
                const newPodRef = cache.writeFragment({
                  data: data.createPod.pod,
                  fragment: gql`
                    fragment NewPod on Pod {
                      id
                      name
                    }
                  `,
                });
                console.log(newPodRef, existingPodsRefs);
                return [newPodRef, ...existingPodsRefs];
              },
            },
          });
        }
      },
    });
    setModal(false);
  };

  const handleCancelCreatePod = () => {
    setModal(false);
  };

  return (
    <Layout>
      <div className="flex-grow flex flex-col items-center">
        {modal && (
          <>
            <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
            <div className="w-96 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg z-30 overflow-hidden">
              <div className="p-5 flex items-center justify-between bg-gray-100 border-b">
                <div className="text-sm font-medium">Create Pod</div>
                <RiCloseLine className="cursor-pointer text-lg" />
              </div>
              <div className="flex flex-col p-5 bg-white gap-4">
                <div className="text-sm">This action will create new pod.</div>
                <input
                  className="h-16 px-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:ring focus:border-blue-500 focus:outline-none"
                  placeholder="Enter pod name"
                  autoFocus={true}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex gap-2 h-8 text-sm">
                  <button
                    className="flex-1 text-white bg-red-500 border border-red-600 rounded-md font-medium shadow-sm hover:bg-red-600  focus:ring focus:ring-red-500 focus:ring-opacity-40 focus:outline-none disabled:opacity-50 disabled:cursor-default"
                    onClick={handleCreatePod}
                  >
                    Create
                  </button>
                  <button
                    className="flex-1 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none"
                    onClick={handleCancelCreatePod}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
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
                  <button
                    className="px-4 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none"
                    onClick={() => setModal(true)}
                  >
                    Create Pod
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
            <div className="flex flex-col bg-gray-50 border rounded-md gap-3 p-3">
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-bold">
                  <div className="text-xs text-gray-800 w-6 h-6 flex justify-center items-center bg-gray-200 rounded-full">
                    0
                  </div>
                  <div className="text-lg text-gray-900">Invites</div>
                </div>
              </div>
              <div className="grid grid-cols-3">You don't any invites</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
