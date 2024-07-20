import React from "react";

type BoxProps = {
  children: React.ReactNode;
  className?: string;
};

const Box: React.FC<BoxProps> = ({ children, className }: BoxProps) => {
  return <div className={className}>{children}</div>;
};

export default Box;
