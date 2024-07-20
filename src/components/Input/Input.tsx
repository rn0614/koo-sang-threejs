import styles from './styles.module.scss'

type InputProps = ComponentPropsWithRef<"input">;

import React, { ComponentPropsWithRef, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, InputProps>((
  { className, type, disabled, ...props },
  ref
) => {
  return (
    <input
      className={styles.input}
      ref={ref}
      type={type}
      disabled={disabled}
      {...props}
    />
  );
});

Input.displayName="Input"

export default Input;