import * as Dialog from "@radix-ui/react-dialog";
import styles from "./styles.module.scss";
import { ExitIcon } from "@radix-ui/react-icons";

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
            <div>{children}</div>
            <Dialog.Close
              asChild
              className={styles.ModalCloseBtn}
              onClick={() => onChange}
            >
              <ExitIcon></ExitIcon>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
