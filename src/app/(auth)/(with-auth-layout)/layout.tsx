import React, { ReactNode } from "react";

type LayoutPors = {
  children: ReactNode;
};

export default function layout({ children }: LayoutPors) {
  return (
    <div>
      <h2>inner layout</h2>
      {children}
    </div>
  );
}
