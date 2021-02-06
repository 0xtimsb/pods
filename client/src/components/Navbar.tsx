import Link from "next/link";
import { useMeQuery, usePodQuery } from "../generated/graphql";

const Navbar: React.FC = () => {
  const { data } = useMeQuery();

  if (!data) return <div>Loading...</div>;

  const {
    me: { pods },
  } = data;

  return (
    <div className="sticky top-0 bg-gray-400">
      <div className="max-w-6xl w-full mx-auto flex justify-between p-3">
        <div className="flex space-x-2 items-center">
          {pods.map((pod) => (
            <Link href={`/pod/${pod.id}`}>
              <a className="h-10 w-10 flex justify-center items-center rounded-md border-2 border-gray-900 cursor-pointer font-medium shadow bg-gray-100 hover:bg-gray-50">
                {pod.name.slice(0, 2).toUpperCase()}
              </a>
            </Link>
          ))}
          <div className="h-10 w-10 flex justify-center items-center rounded-md cursor-pointer text-xl hover:bg-gray-300">
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
