import React, { ReactNode } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import styles from "./styles.module.scss";

type CheckboxProps = {
  children?: ReactNode;
};

const StyledCheckbox = ({ children, ...props }: CheckboxProps) => (
  <Checkbox.Root className={styles.CheckboxRoot} defaultChecked id="c1">
    <Checkbox.Indicator className={styles.CheckboxIndicator}>
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Root>
);

export default StyledCheckbox;
