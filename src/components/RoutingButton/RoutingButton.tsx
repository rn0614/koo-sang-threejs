"use client";
import { stackRouterBack } from "@/utils/stackRouter";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
};

const RoutingBackButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => {
    const router = useRouter();
    return (
      <Button onClick={() => stackRouterBack(router)} ref={ref}>
        {children}
      </Button>
    );
  }
);

RoutingBackButton.displayName = "RoutingBackButton";
export default RoutingBackButton;
