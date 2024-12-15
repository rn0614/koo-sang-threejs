"use client";
import { ReactNode } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@/utils/supabase/client";

type SuperbaseProviderProps = {
  children: ReactNode;
};

const SupabaseProvider: React.FC<SuperbaseProviderProps> = ({ children }) => {
  const supabase = createClient();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
