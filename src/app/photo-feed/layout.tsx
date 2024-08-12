import React from "react";

export default function layout({
  photoModal,
  children,
}: {
  photoModal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="photoModal">{photoModal}</div>
      <div>{children}</div>
    </div>
  );
}
