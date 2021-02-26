import { useRef, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusRef = useRef(null);

  const buttonProps = {
    ref: returnFocusRef,
    onClick: () => setIsOpen(true),
  };

  const dialogProps = {
    isOpen,
    returnFocusRef,
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return { buttonProps, dialogProps, handleClose };
};

export default useModal;
