import { useRef, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusRef = useRef(null);

  const buttonProps = {
    ref: returnFocusRef,
    onClick: () => setIsOpen(true),
  };

  const modalProps = {
    isOpen,
    returnFocusRef,
    setIsOpen,
  };

  return { modalProps, buttonProps };
};

export default useModal;
