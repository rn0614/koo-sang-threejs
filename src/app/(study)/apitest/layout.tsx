import React from "react";

export default function Layout({
  children,
  testing,
  parallel,
  additional
}: {
  children: React.ReactNode;
  testing: React.ReactNode;
  parallel:React.ReactNode;
  additional: React.ReactNode
}) {
  return (
    <div>
      <div>layout1</div>
      <div>{children}</div>
      <div>{parallel}</div>
      <div className="testing">{testing}</div>
      <div>{additional}</div>
    </div>
  );
}
