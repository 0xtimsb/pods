import { useQuery } from "@apollo/client";
import { MeQuery } from "../generated/graphql";

interface HomeProps {
  me: MeQuery["me"];
}

const Home: React.FC<HomeProps> = ({ me }) => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center space-y-8">
      <div className="text-gray-900 font-bold text-5xl">Log Pods</div>
      <div className="w-72 space-y-3"></div>
    </div>
  );
};

export default Home;
