import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiLock, FiMail, FiSmile } from "react-icons/fi";

// Graphql
import { useLoginMutation } from "../generated/graphql";

// Components
import Layout from "../components/common/Layout";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Navbar from "../components/common/Navbar";

type FormData = {
  usernameOrEmail: string;
  password: string;
};

const LogIn = () => {
  const [loginMutation, { loading }] = useLoginMutation();
  const { register, handleSubmit, watch } = useForm<FormData>();

  const onSubmit = handleSubmit(({ usernameOrEmail, password }) => {
    loginMutation({
      variables: { usernameOrEmail, password },
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            me() {
              if (data) {
                return data.login.user;
              }
              return null;
            },
          },
        });
      },
    });
  });

  const usernameOrEmail = watch("usernameOrEmail", "");
  const isTypingEmail = usernameOrEmail && usernameOrEmail.includes("@");

  return (
    <>
      <form
        className="flex-grow flex flex-col justify-center items-center space-y-8"
        onSubmit={onSubmit}
      >
        <div className="text-gray-900 font-bold text-5xl">Log in to Pods</div>
        <div className="w-72 space-y-3">
          <Input
            placeholder="Username / Email"
            Icon={isTypingEmail ? FiMail : FiSmile}
            name="usernameOrEmail"
            aria-label="usernameOrEmail"
            ref={register}
          />
          <Input
            placeholder="Password"
            Icon={FiLock}
            type="password"
            name="password"
            aria-label="password"
            ref={register}
          />
          <Button className="h-12" type="submit" disabled={loading}>
            Continue
          </Button>
        </div>
      </form>
      <div className="h-28 border-t border-gray-200 flex justify-center items-center">
        <Link to="/signup" className="text-blue-600 hover:underline">
          Don't have an account? Sign Up
        </Link>
      </div>
    </>
  );
};

export default LogIn;
