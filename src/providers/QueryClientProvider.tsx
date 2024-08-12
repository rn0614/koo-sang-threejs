"use client"
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider as QueryClientPro } from 'react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

type QueryClientProviderProps = {
  children: ReactNode;
};

export default function QueryClientProvider({children}:QueryClientProviderProps) {
  return (
    <QueryClientPro client={queryClient}>
      {children}
      <Toaster />
    </QueryClientPro>
  );
}