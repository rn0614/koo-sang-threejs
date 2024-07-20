import { ComponentPropsWithRef } from "react";
import styles from "./styles.module.scss";

type ButtonProps = ComponentPropsWithRef<"button">;

const Button = ({
  className,
  children,
  disabled,
  type = "button",
  ref,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={styles.Button}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
