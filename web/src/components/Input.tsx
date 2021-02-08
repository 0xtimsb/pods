const Input: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <input className={`px-3 text-sm font-medium rounded border border-gray-900 ${className}`} {...props}>
      {children}
    </input>
  );
};

export default Input;
