"use client";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <BounceLoader size={40} />
    </div>
  );
};

export default Loading;
