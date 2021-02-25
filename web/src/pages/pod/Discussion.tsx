import { gql } from "@apollo/client";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Container from "../../components/Container";
import { Pod, useInviteToPodMutation } from "../../generated/graphql";

const Discussion = ({ pod }: { pod: Pod }) => {
  // Modal
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState("");
  const [inviteToPod] = useInviteToPodMutation();

  const handleInviteUser = async () => {
    await inviteToPod({
      variables: { username, podId: pod.id, asAdmin: false },
    });
    setModal(false);
  };

  const handleCancelCreatePod = () => {
    setModal(false);
  };

  return (
    <Container>
      <div className="flex-grow flex flex-col justify-center items-center space-y-8">
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
                  placeholder="Enter username name"
                  autoFocus={true}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="flex gap-2 h-8 text-sm">
                  <button
                    className="flex-1 text-white bg-red-500 border border-red-600 rounded-md font-medium shadow-sm hover:bg-red-600  focus:ring focus:ring-red-500 focus:ring-opacity-40 focus:outline-none disabled:opacity-50 disabled:cursor-default"
                    onClick={handleInviteUser}
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
        <div className="text-gray-900 font-bold text-5xl">Discussion</div>
        <div className="w-72 space-y-3"></div>
        <button
          className="px-4 text-gray-900 bg-white border border-gray-300 rounded-md font-medium shadow-sm hover:bg-gray-50 focus:ring focus:border-blue-500 focus:outline-none"
          onClick={() => setModal(true)}
        >
          Invite
        </button>
      </div>
    </Container>
  );
};

export default Discussion;
