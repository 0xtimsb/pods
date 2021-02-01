import { IoAdd } from "react-icons/io5";

const Add: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      className="cursor-pointer rounded-full hover:bg-cream-100 p-2"
      {...props}
    >
      <IoAdd fontSize={21} />
    </div>
  );
};

export default Add;
