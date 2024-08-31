"use client";
import { mswStart } from "@/mocks";
import { useEffect } from "react";

export function MockServiceProvider() {
  useEffect(() => {
    mswStart()
  }, []);
  
  return null;
}
