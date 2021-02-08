import { FiMail } from "react-icons/fi";
import { IconType } from "react-icons/lib";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  Icon?: IconType;
}

const Input: React.FC<InputProps> = ({ children, className, Icon, ...props }) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      {Icon && <Icon className="absolute left-3 text-gray-900" />}
      <input
        className={`w-full h-10 text-sm rounded border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors duration-200 ${
          Icon ? "pl-10" : "px-3"
        }`}
        {...props}
      />
    </div>
  );
};

export default Input;
