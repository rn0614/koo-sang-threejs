import { ThreeContent } from "@/components/three/ThreeContent/ThreeContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "KooSang-project-threejs",
  description: "three js Metadata",
};

export default function ThreePage() {
  return (
    <div style={{ width: "100%", height: "100%", minHeight: "100%" }}>
      <ThreeContent />
    </div>
  );
}
