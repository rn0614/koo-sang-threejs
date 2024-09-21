import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tooltip from "@radix-ui/react-tooltip";

type MyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  (props, ref) => <button {...props} ref={ref} />
);
MyButton.displayName = "MyButton";

export default function StyledDialog() {
  return (
    <Dialog.Root>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Dialog.Trigger asChild>
            <MyButton />
          </Dialog.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Portal>…</Tooltip.Portal>
      </Tooltip.Root>
      <Dialog.Portal>...</Dialog.Portal>
    </Dialog.Root>
  );
}
