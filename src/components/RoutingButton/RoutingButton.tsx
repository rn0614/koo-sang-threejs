"use client";
import { stackRouterBack } from "@/utils/stackRouter";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};

const RoutingBackButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    const router = useRouter();
    return (
      <button onClick={() => stackRouterBack(router)} ref={ref} {...rest}>
        {children}
      </button>
    );
  }
);

RoutingBackButton.displayName = "RoutingBackButton";
export default RoutingBackButton;
