import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import styles from "./styles.module.scss";

const StyledPopover = () => (
  <Popover.Root>
    <Popover.Trigger className={styles.PopoverTrigger}>
      More info
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={styles.PopoverContent}>
        Some more info…
        <Popover.Arrow className={styles.PopoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default StyledPopover;
