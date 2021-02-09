import { Link } from "react-router-dom";
import { FiLock, FiMail, FiSmile } from "react-icons/fi";
import { useForm } from "react-hook-form";

// Graphql
import { useRegisterMutation } from "../../generated/graphql";

// Components
import Layout from "../../components/common/Layout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Navbar from "../../components/common/Navbar";

type FormData = {
  email: string;
  username: string;
  password: string;
};

const SignUp = () => {
  const [registerMutation, { loading }] = useRegisterMutation();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = handleSubmit(({ email, username, password }) => {
    registerMutation({
      variables: { username, email, password },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            me() {
              if (data) {
                return data.register.user;
              }
              return null;
            },
          },
        });
      },
    });
  });

  return (
    <Layout>
      <Navbar />
      <form className="flex-grow flex flex-col justify-center items-center space-y-8" onSubmit={onSubmit}>
        <div className="text-gray-900 font-bold text-5xl">Join Pods</div>
        <div className="w-72 space-y-3">
          <Input placeholder="Email" Icon={FiMail} name="email" ref={register} />
          <Input placeholder="Username" Icon={FiSmile} name="username" ref={register} />
          <Input placeholder="Password" Icon={FiLock} name="password" ref={register} />
          <Button className="h-12" type="submit" disabled={loading}>
            Sign Up
          </Button>
        </div>
      </form>
      <div className="h-28 border-t border-gray-200 flex justify-center items-center">
        <Link to="/login" className="text-blue-600 hover:underline">
          Already have an account? Log in
        </Link>
      </div>
    </Layout>
  );
};

export default SignUp;
