import { useState } from "react";

import useInputModal from "./useInputModal";

const useInputAndCheckModal = () => {
  const [check, setCheck] = useState(false);

  const {
    value,
    buttonProps,
    dialogProps,
    inputProps,
    handleClose: handlePartialClose,
  } = useInputModal();

  const handleClose = () => {
    handlePartialClose();
    setCheck(false);
  };

  return {
    check,
    setCheck,
    value,
    inputProps,
    buttonProps,
    dialogProps,
    handleClose,
  };
};

export default useInputAndCheckModal;
