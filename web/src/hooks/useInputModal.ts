import { useState } from "react";
import useModal from "./useModal";

const useInputModal = () => {
  const [text, setText] = useState("");

  const {
    buttonProps,
    dialogProps,
    handleClose: handlePartialClose,
  } = useModal();

  const handleClose = () => {
    handlePartialClose();
    setText("");
  };

  const inputProps = {
    onChange: (e: any) => setText(e.target.value),
    value: text,
  };

  return { value: text, inputProps, buttonProps, dialogProps, handleClose };
};

export default useInputModal;
