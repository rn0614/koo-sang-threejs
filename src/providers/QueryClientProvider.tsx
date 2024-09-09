"use client"
import React, { ReactNode } from "react";
import { QueryClientProvider as QueryClientPro,QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import queryClient from "@/utils/react-query/queryClient";
import { RecoilRoot } from "recoil";


type QueryClientProviderProps = {
  children: ReactNode;
};


export default function QueryClientProvider({children}:QueryClientProviderProps) {
  const querycli = queryClient();
  return (
    <QueryClientPro client={querycli}>
      <RecoilRoot>
      {children}
      <Toaster />
      <ReactQueryDevtools/>
      </RecoilRoot>
    </QueryClientPro>
  );
}