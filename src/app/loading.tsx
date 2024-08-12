"use client";

import Box from "@/components/Box/Box";
import { BounceLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center"

      }}
    >
      <BounceLoader size={40} />
    </div>
  );
};

export default Loading;
