"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  return (
    <Auth
      magicLink
      supabaseClient={supabaseClient}
      providers={["github"]}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: { colors: { brand: "#404040", brandAccent: "#22c55e" } },
        },
      }}
    ></Auth>
  );
};

export default LoginPage;
