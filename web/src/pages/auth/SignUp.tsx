import { FiLock, FiMail, FiSmile } from "react-icons/fi";

import Layout from "../../components/common/Layout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";

const SignUp = ({ refetch }: any) => {
  return (
    <Layout>
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center space-y-8">
        <div className="text-gray-900 font-bold text-5xl">Join Pods</div>
        <div className="w-72 space-y-3">
          <Input placeholder="Name" Icon={FiSmile} />
          <Input placeholder="Email" Icon={FiMail} />
          <Input placeholder="Password" Icon={FiLock} />
          <Button className="h-12">Sign Up</Button>
        </div>
      </div>
      <div className="h-28 border-t border-gray-200 flex justify-center items-center">
        <Link to="/login" className="text-blue-600 hover:underline">
          Already have an account? Log in
        </Link>
      </div>
    </Layout>
  );
};

export default SignUp;
