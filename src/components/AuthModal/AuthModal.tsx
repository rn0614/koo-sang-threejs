"use client";

import React, { useEffect } from "react";
import Modal from "../Modal/Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

export const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(()=>{
    if(session){
      router.refresh();
      onClose();
    }
  },[session, router, onClose])

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal title="Wellcom" description="login" isOpen={isOpen} onChange={onChange}>
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
    </Modal>
  );
};
