"use client"
import React, { ReactNode } from "react";
import { QueryClientProvider as QueryClientPro } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from 'react-hot-toast';
import queryClient from "@/utils/react-query/queryClient";
import { RecoilRoot } from "recoil";


type QueryClientProviderProps = {
  children: ReactNode;
};

export default function QueryClientProvider({children}:QueryClientProviderProps) {
  const queryCli = queryClient();
  return (
    <QueryClientPro client={queryCli}>
      <RecoilRoot>
      {children}
      <Toaster />
      <ReactQueryDevtools/>
      </RecoilRoot>
    </QueryClientPro>
  );
}