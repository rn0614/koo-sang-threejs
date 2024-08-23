import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./styles.module.scss";
import { Box } from "@radix-ui/themes";

export type ModalProps = {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.ModalOverlay}>
          <Dialog.Content className={styles.ModalContent}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            {children}
            <Dialog.Close
              asChild
              className={styles.ModalCloseBtn}
              onClick={() => onChange}
            >
              <AiOutlineClose></AiOutlineClose>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
