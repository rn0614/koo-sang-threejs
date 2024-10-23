// Modify src/components/Drawer/Drawr.tsx
import { useDrawer } from "@/providers/DrawerProvider";
import * as Dialog from "@radix-ui/react-dialog";

const Drawer = () => {
  const { isOpen, closeDrawer, drawerContent } = useDrawer();
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDrawer}>
      <Dialog.Portal>
        <Dialog.Content>
          {drawerContent}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Drawer;