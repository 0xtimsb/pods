import Layout from "../../components/common/Layout";

const Overview: React.FC = () => {
  return (
    <Layout>
      <div className="flex-grow flex flex-col justify-center items-center space-y-8">
        <div className="text-gray-900 font-bold text-5xl">Overview</div>
        <div className="w-72 space-y-3"></div>
      </div>
    </Layout>
  );
};

export default Overview;
