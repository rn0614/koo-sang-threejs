"use client";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Input from "../Input/Input";

export const SerachInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/music/search",
      query: query,
    });
    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to do"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
