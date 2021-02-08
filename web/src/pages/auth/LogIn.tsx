import Button from "../../components/Button";
import Input from "../../components/Input";

const LogIn = ({ refetch }: any) => {
  return (
    <div>
      <Input className="w-56 h-14" placeholder="you@domain.com" />
      <Button className="w-56 h-14">Log In</Button>
    </div>
  );
};

export default LogIn;
