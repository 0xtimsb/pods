import { useState } from "react";
import {
  Box,
  Button,
  ButtonPrimary,
  Dialog,
  DialogProps,
  Flex,
  TextInput,
} from "@primer/components";

interface ModalProps {
  title: string;
  placeholder: string;
  submit: string;
  isOpen: boolean;
  handleSubmit: (text: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  returnFocusRef: React.MutableRefObject<null>;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    title,
    placeholder,
    submit,
    handleSubmit,
    setIsOpen,
    ...dialogProps
  } = props;

  const [text, setText] = useState("");

  const handleClose = () => {
    setIsOpen(false);
    setText("");
  };

  const handleSuccess = () => {
    handleClose();
    handleSubmit(text);
  };

  return (
    <Dialog {...dialogProps} onDismiss={handleClose} aria-labelledby="label">
      <Dialog.Header>{title}</Dialog.Header>
      <Box p={3}>
        <TextInput
          placeholder={placeholder}
          width={1}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <Flex mt={3} justifyContent="flex-end">
          <Button mr={1} onClick={handleClose}>
            Cancel
          </Button>
          <ButtonPrimary onClick={handleSuccess}>{submit}</ButtonPrimary>
        </Flex>
      </Box>
    </Dialog>
  );
};

export default Modal;
